// routes/login.js
const express = require('express');
const { handleLogin } = require('../controllers/login');
const router = express.Router();

router.get('/login', handleLogin);
router.post('/login',handleLogin);

module.exports = router;
