# KarmaGPT Middleware API

A middleware service that provides simplified access to Reddit data via REST API endpoints.

## API Documentation

The API is documented using the OpenAPI 3.1.0 specification. You can find the full API documentation in the `openapi.yaml` file.

### Base URL 
```
https://api.karmasaur.com
```

### Available Endpoints

1. Subreddit Information
   - `GET /subreddit/{subreddit}` - Basic information
   - `GET /subreddit/{subreddit}/rules` - Subreddit rules
   - `GET /subreddit/{subreddit}/moderators` - List of moderators

2. Subreddit Posts
   - `GET /subreddit/{subreddit}/posts` - Recent posts
   - `GET /subreddit/{subreddit}/hot` - Hot posts
   - `GET /subreddit/{subreddit}/rising` - Rising posts
   - `GET /subreddit/{subreddit}/controversial` - Controversial posts
   - `GET /subreddit/{subreddit}/top` - Top posts

3. Subreddit Discovery
   - `GET /subreddits/popular` - List popular subreddits
   - `GET /subreddits/new` - List new subreddits
   - `GET /subreddits/search?q={query}` - Search for subreddits

4. User Information
   - `GET /user/{username}` - Basic user info
   - `GET /user/{username}/posts` - User's posts
   - `GET /user/{username}/comments` - User's comments

### Response Formats

All endpoints return JSON responses with appropriate HTTP status codes:
- 200: Successful request
- 400: Bad request (missing parameters)
- 404: Resource not found
- 500: Internal server error

For detailed schema information and example responses, please refer to the OpenAPI specification.

## Development

To view the API documentation in a more readable format, you can:
1. Copy the contents of `openapi.yaml`
2. Paste it into the [Swagger Editor](https://editor.swagger.io/)
3. View the interactive documentation

## Using with GPT

This API is designed to be easily consumed by GPT models. The OpenAPI specification provides all the necessary information for GPT to understand the available endpoints and their response formats.

### Reddit Notation Support
The API understands both standard Reddit notation and plain text:
- Subreddits: both `r/subreddit` and `subreddit` formats
- Users: both `u/username` and `username` formats