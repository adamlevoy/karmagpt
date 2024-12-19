const express = require('express');
const router = express.Router();
const redditClient = require('../config/reddit');

// Subreddit endpoints
router.get('/subreddit/:name', async (req, res, next) => {
  try {
    const subreddit = await redditClient.getSubreddit(req.params.name).fetch();
    res.json(subreddit);
  } catch (error) {
    next(error);
  }
});

router.get('/subreddit/:name/posts', async (req, res, next) => {
  try {
    const posts = await redditClient
      .getSubreddit(req.params.name)
      .getNew({ limit: 25 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/subreddit/:name/rules', async (req, res, next) => {
  try {
    const rules = await redditClient.getSubreddit(req.params.name).getRules();
    res.json(rules);
  } catch (error) {
    next(error);
  }
});

// User endpoints
router.get('/user/:username', async (req, res, next) => {
  try {
    const user = await redditClient.getUser(req.params.username).fetch();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:username/posts', async (req, res, next) => {
  try {
    const posts = await redditClient
      .getUser(req.params.username)
      .getSubmissions({ limit: 25 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:username/comments', async (req, res, next) => {
  try {
    const comments = await redditClient
      .getUser(req.params.username)
      .getComments({ limit: 25 });
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 