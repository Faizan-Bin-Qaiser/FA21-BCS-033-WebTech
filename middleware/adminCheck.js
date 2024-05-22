// middlewares/adminCheck.js
module.exports = (req, res, next) => {
    if (req.session.userId) {
      User.findById(req.session.userId)
        .then(user => {
          if (user && user.isAdmin) {
            next();
          } else {
            res.status(403).json({ error: 'Access denied. Admins only.' });
          }
        })
        .catch(error => {
          res.status(500).json({ error: error.message });
        });
    } else {
      res.status(403).json({ error: 'You must be logged in.' });
    }
  };
  