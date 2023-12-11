// routes/login.js
const express = require('express');
const { handleLogin, handleSignUp } = require('../controllers/login');
const { updateAccount } = require('../controllers/account');
const router = express.Router();

router.get('/login', handleLogin);
router.post('/login',handleLogin);
router.post('/signUp',handleSignUp);
router.post('/updateAccount', updateAccount);

module.exports = router;
