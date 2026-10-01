const express = require('express');
const router = express.Router();
const protect = require('../middleware/user.middleware');
const { register,login, verifyEmail } = require('../controllers/user.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email',verifyEmail)

router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        message: 'You have access to your profile',
        user: req.user
    });
});

module.exports = router;