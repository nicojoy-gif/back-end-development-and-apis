import express from 'express';
import helmet from 'helmet';
import { authenticate } from './middleware/authenticate.js';
import authRoutes from './routes/auth.js';
import watchlistRoutes from './routes/watchlist.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Family Movie Watchlist API');
});

app.use('/api/auth', authRoutes);
app.use('/api/watchlist', authenticate, watchlistRoutes);

app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});