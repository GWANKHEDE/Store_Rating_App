
const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

const { auth } = require('../middlewares/auth');
router.post('/change-password', auth, changePassword);

module.exports = router;
