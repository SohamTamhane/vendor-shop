const express = require('express');
const router = express.Router();

const {create, login, labours} = require('../controllers/Labour');

router.post('/create', create);
router.post('/login', login);
router.get('/labours', labours);

module.exports = router;