module.exports = function (req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
      return next();
  } else {
      return res.status(403).json({ error: 'Access denied, admin only' });
  }
};
