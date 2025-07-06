// backend/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/userController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
const { auth } = require('../middlewares/auth');
router.post('/change-password', auth, changePassword);

module.exports = router;
