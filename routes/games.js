const express = require('express');
const router = express.Router();
const Game = require('../models/gameModel');

// Get all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.render('games',{games:games})

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

// Create a game
router.post('/', async (req, res) => {
    const game = new Game({
        title: req.body.title,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a game
router.patch('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game == null) {
            return res.status(404).json({ message: 'Cannot find game' });
        }

        if (req.body.title != null) {
            game.title = req.body.title;
        }
        if (req.body.description != null) {
            game.description = req.body.description;
        }
        if (req.body.releaseDate != null) {
            game.releaseDate = req.body.releaseDate;
        }

        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a game
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game == null) {
            return res.status(404).json({ message: 'Cannot find game' });
        }

        await game.remove();
        res.json({ message: 'Deleted game' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
