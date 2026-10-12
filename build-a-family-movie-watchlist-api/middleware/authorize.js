export function authorizeModification(req, res, next) {
  const { role, id } = req.user || {};
  const targetId = req.params.userId;

  if (role === 'parent') {
    return next();
  }

  if (role === 'child' && String(id) === String(targetId)) {
    return next();
  }

  return res.status(403).json({ error: 'Access denied' });
}