const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Store the password as plain text (NOT SECURE)
    const user = new User({ name, email, password });
    await user.save();
    req.session.userId = user._id;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'No user found with this email' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user._id;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.use((req, res, next) => {
   res.locals.user = req.session.userId ? { _id: req.session.userId } : null;
   next();
 });
 
module.exports = router;
