const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users_controller');

router.get('/profile',usersControllers.profile);

router.get('/sign-up',usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);

router.post('/create',usersControllers.create);

router.post('/create-session',usersControllers.createSession);

router.post('/sign-out',usersControllers.signOut);

module.exports = router;