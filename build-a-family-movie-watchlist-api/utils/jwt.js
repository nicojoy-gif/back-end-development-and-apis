import jwt from 'jsonwebtoken';

function getSecret() {
  return process.env.JWT_SECRET || 'dev-secret-change-me';
}

export function signToken(payload) {
  return jwt.sign(payload, getSecret(), { expiresIn: '1d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch (err) {
    return null;
  }
}