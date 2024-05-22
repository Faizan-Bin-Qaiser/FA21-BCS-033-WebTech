const express = require('express');
const router = express.Router();
const Game = require('../models/gameModel');
const adminCheck = require('../middleware/adminCheck');

// Get all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.render('games', { games: games });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one game
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game == null) {
            return res.status(404).json({ message: 'Cannot find game' });
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a game (Admin only)
router.get('/create', adminCheck, (req, res) => {
    res.render('createGame');
});

router.post('/create', adminCheck, async (req, res) => {
    const game = new Game({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        buyLink: req.body.buyLink
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a game (Admin only)
router.get('/edit/:id', adminCheck, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        res.render('editGame', { game: game });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit/:id', adminCheck, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game == null) {
            return res.status(404).json({ message: 'Cannot find game' });
        }

        game.name = req.body.name;
        game.description = req.body.description;
        game.image = req.body.image;
        game.buyLink = req.body.buyLink;

        await game.save();
        res.redirect('/games');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a game (Admin only)
router.post('/delete/:id', adminCheck, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game == null) {
            return res.status(404).json({ message: 'Cannot find game' });
        }

        await game.remove();
        res.redirect('/games');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
