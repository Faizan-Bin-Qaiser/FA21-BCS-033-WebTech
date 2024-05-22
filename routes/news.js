const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');
const adminCheck = require('../middleware/adminCheck');

// Get all games
router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.render('newswire', { newsItems: news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create news
router.get('/create', adminCheck, (req, res) => {
    res.render('createNews');
});

router.post('/create', adminCheck, async (req, res) => {
    const news = new News({
        name: req.body.name,
        content: req.body.content,
        image: req.body.image
    });

    try {
        const newNews = await news.save();
        res.redirect('/news');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit news
router.get('/edit/:id', adminCheck, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        res.render('editNews', { news: news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', adminCheck, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news == null) {
            return res.status(404).json({ message: 'Cannot find news' });
        }

        news.name = req.body.name;
        news.content = req.body.content;
        news.image = req.body.image;

        await news.save();
        res.redirect('/news');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete news
router.post('/delete/:id', adminCheck, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news == null) {
            return res.status(404).json({ message: 'Cannot find news' });
        }

        await news.remove();
        res.redirect('/news');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
