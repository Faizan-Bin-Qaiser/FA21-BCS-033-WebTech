const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');
const adminCheck = require('../middleware/adminCheck');

// Get all news with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    try {
        const newsItems = await News.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalNews = await News.countDocuments();

        res.render('newswire', {
            newsItems: newsItems,
            currentPage: page,
            totalPages: Math.ceil(totalNews / limit),
            isAdmin: req.session.user && req.session.user.isAdmin
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create news (admin only)
router.get('/edit/:id', adminCheck, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.render('createGame', { news: news });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to handle the edit form submission
router.post('/edit/:id', adminCheck, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }

        news.name = req.body.name;
        news.content = req.body.content;
        news.image = req.body.image;

        await news.save();
        res.redirect('/newswire'); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update news (admin only)
router.patch('/:id', adminCheck, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Cannot find news' });
        }

        if (req.body.name != null) {
            news.name = req.body.name;
        }
        if (req.body.content != null) {
            news.content = req.body.content;
        }
        if (req.body.image != null) {
            news.image = req.body.image;
        }

        const updatedNews = await news.save();
        res.json(updatedNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete news (admin only)
router.delete('/:id', adminCheck, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'Cannot find news' });
        }

        await news.remove();
        res.json({ message: 'Deleted news' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
