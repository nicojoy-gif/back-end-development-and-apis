import express from 'express';
import { authorizeModification } from '../middleware/authorize.js';
import {
  findById,
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../utils/db.js';

const router = express.Router();

// db.js compares ids with ===, so match the type your users.json uses
function resolveUserId(raw) {
  const asNumber = Number(raw);
  return findById(asNumber) ? asNumber : raw;
}

router.get('/:userId', (req, res) => {
  const watchlist = getWatchlist(resolveUserId(req.params.userId));

  if (watchlist === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json(watchlist);
});

router.post('/:userId/movies', authorizeModification, (req, res) => {
  const { title, genre } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const movie = addMovie(resolveUserId(req.params.userId), { title, genre });

  if (!movie) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(201).json(movie);
});

router.put('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const movie = updateMovie(
    resolveUserId(req.params.userId),
    Number(req.params.movieId),
    req.body || {},
  );

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  return res.status(200).json(movie);
});

router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const removed = deleteMovie(
    resolveUserId(req.params.userId),
    Number(req.params.movieId),
  );

  if (!removed) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  return res.status(200).json({ message: 'Movie removed' });
});

export default router;