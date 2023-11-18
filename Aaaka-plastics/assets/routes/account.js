const express = require('express');
const { handleAddAccount, GetAccountNames } = require('../controllers/account');
const router = express.Router();

router.get('/addAccount', handleAddAccount);
router.post('/addAccount',handleAddAccount);
router.get('/getAccountNames',GetAccountNames);
module.exports = router;