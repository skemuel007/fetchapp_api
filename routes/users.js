const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');


router.post('/auth/register', userController.create);
router.post('/auth/login', userController.authenticate);

module.exports = router;