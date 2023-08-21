const express = require('express');
const router = express.Router();

const {register, login, orders, users, allorders, acceptOrder, viewOrders} = require('../controllers/User');

router.post('/register', register);
router.post('/login', login);
router.post('/order', orders);
router.get('/users', users);
router.get('/allorders', allorders);
router.post('/acceptorder', acceptOrder);
router.post('/vieworders', viewOrders);

module.exports = router;