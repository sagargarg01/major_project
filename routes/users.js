const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users_controller');

router.get('/profile',usersControllers.profile);

router.get('/sign-up',usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);

module.exports = router;