const express = require('express');
const router = express.Router();

const usersPosts = require('../controllers/posts_controller');

router.get('/posts',usersPosts.posts);

module.exports = router;