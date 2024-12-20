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

router.get('/subreddit/:name/moderators', async (req, res, next) => {
  try {
    const subreddit = await redditClient.getSubreddit(req.params.name);
    const moderators = await subreddit.getModerators();
    res.json(moderators);
  } catch (error) {
    next(error);
  }
});

// Add these new endpoints for different post sorting methods
router.get('/subreddit/:name/hot', async (req, res, next) => {
  try {
    const posts = await redditClient
      .getSubreddit(req.params.name)
      .getHot({ limit: 25 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/subreddit/:name/rising', async (req, res, next) => {
  try {
    const posts = await redditClient
      .getSubreddit(req.params.name)
      .getRising({ limit: 25 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/subreddit/:name/controversial', async (req, res, next) => {
  try {
    const posts = await redditClient
      .getSubreddit(req.params.name)
      .getControversial({ limit: 25 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/subreddit/:name/top', async (req, res, next) => {
  try {
    const posts = await redditClient
      .getSubreddit(req.params.name)
      .getTop({ limit: 25 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Add these new endpoints for subreddit discovery
router.get('/subreddits/popular', async (req, res, next) => {
  try {
    const subreddits = await redditClient.getPopularSubreddits({ limit: 25 });
    res.json(subreddits);
  } catch (error) {
    next(error);
  }
});

router.get('/subreddits/new', async (req, res, next) => {
  try {
    const subreddits = await redditClient.getNewSubreddits({ limit: 25 });
    res.json(subreddits);
  } catch (error) {
    next(error);
  }
});

router.get('/subreddits/search', async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const results = await redditClient.searchSubreddits({
      query,
      limit: 25
    });
    res.json(results);
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