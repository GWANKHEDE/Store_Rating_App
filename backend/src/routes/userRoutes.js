// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/auth');

// Admin only routes
router.get('/', auth, adminAuth, getAllUsers);
router.get('/:id', auth, adminAuth, getUserById);

module.exports = router;
