import express from 'express';
import bcrypt from 'bcryptjs';
import { findByUsername } from '../utils/db.js';
import { signToken } from '../utils/jwt.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  const user = await findByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return res.status(200).json({ message: 'User logged in successfully', token });
});

export default router;