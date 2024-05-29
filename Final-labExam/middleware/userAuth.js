module.exports = function (req, res, next) {
    if (req.session && req.session.user) {
      next();
      
    } else {
      // User is not authenticated, redirect to login page
      res.redirect('/login');
    }
  };