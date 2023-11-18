const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');

router.post('/addItem', itemController.addItem);

module.exports = router;
