const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const userAuth = require('../middleware/userAuth.js')


router.get('/visitedproducts', userAuth, async (req, res) => {
  try {
    if (!req.session.visitedProducts || req.session.visitedProducts.length === 0) {
      return res.render('visitedproducts', { products: [], user: req.user });
    }

    const visitedProducts = await Product.find({ _id: { $in: req.session.visitedProducts } });
    res.render('visitedproducts', { products: visitedProducts, user: req.user });
  } catch (error) {
    res.status(500).send('Error fetching visited products');
  }
});


module.exports = router;
