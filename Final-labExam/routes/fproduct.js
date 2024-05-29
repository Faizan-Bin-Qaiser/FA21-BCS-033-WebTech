const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); 
const userAuth = require('../middleware/userAuth.js')


router.get('/fproducts', async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true }).limit(5);
        res.render('fproducts', { products });
    } catch (err) {
        res.status(500).send(err);
    }
});


  router.get('/fproducts/:id', userAuth,  async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        if (!req.session.visitedProducts) {
            req.session.visitedProducts = [];
        }
        if (!req.session.visitedProducts.includes(req.params.id)) {
            req.session.visitedProducts.push(req.params.id);
        }

        res.render('product', { product, user: req.user });
    } catch (error) {
        res.status(500).send('Error fetching product');
    }
});

module.exports = router;
