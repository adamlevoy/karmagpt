const Snoowrap = require('snoowrap');
require('dotenv').config();

const redditClient = new Snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

// Configure default request settings
redditClient.config({
  requestDelay: 1000,
  continueAfterRatelimitError: true,
  retryErrorCodes: [502, 503, 504, 522]
});

module.exports = redditClient; 