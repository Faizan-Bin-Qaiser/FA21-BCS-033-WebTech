const express = require('express');
const router = express.Router();
const Game = require('../models/gameModel');
const adminCheck = require('../middleware/adminCheck');

// Get all games with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;

    try {
        const games = await Game.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalGames = await Game.countDocuments();

        res.render('games', {
            games: games,
            currentPage: page,
            totalPages: Math.ceil(totalGames / limit),
            isAdmin: req.session.user && req.session.user.isAdmin
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a game (admin only)
// router.post('/createGame', adminCheck, async (req, res) => {
//     const game = new Game({
//         name: req.body.name,
//         description: req.body.description,
//         image: req.body.image,
//     });

//     try {
//         const newGame = await game.save();
//         res.status(201).json(newGame);

//         res.render("createGame")
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Route to handle form submission
router.post('/createGame', adminCheck, async (req, res) => {
    const { name, description, image } = req.body;

    try {
        const game = new Game({ name, description, image });
        await game.save();
        res.redirect('/games'); // Redirect to the games listing page after creation
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a game (admin only)
router.patch('/:id', adminCheck, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Cannot find game' });
        }

        if (req.body.name != null) {
            game.name = req.body.name;
        }
        if (req.body.description != null) {
            game.description = req.body.description;
        }
        if (req.body.image != null) {
            game.image = req.body.image;
        }

        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a game (admin only)
router.post('/delete/:id', async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Cannot find game' });
        }

        // await game.remove();
        res.redirect('/games');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
