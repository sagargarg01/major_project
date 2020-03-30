const express = require('express');
const router = express.Router();

const usersPosts = require('../controllers/posts_controller');

// router.get('/posts',usersPosts.posts);

router.post('/create',usersPosts.create);

module.exports = router;