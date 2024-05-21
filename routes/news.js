const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');

// Get all news
router.get('/', async (req, res) => {
    try {
        const newsItems = await News.find();
        res.render('newswire', { newsItems });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a news item
router.post('/', async (req, res) => {
    const news = new News({
        name: req.body.name,
        content: req.body.content,
        image: req.body.image,
        publishedDate: req.body.publishedDate,
    });

    try {
        const newNews = await news.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
