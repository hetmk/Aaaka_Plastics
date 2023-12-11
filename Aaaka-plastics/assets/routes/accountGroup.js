const express = require('express');
const { handleAddAccountGroup, GetAccountGroupDetails } = require('../controllers/accountGroup');
const router = express.Router();

router.post('/addAccountGroup',handleAddAccountGroup);
router.get('/getAccountGroupDetails',GetAccountGroupDetails);
module.exports = router;    