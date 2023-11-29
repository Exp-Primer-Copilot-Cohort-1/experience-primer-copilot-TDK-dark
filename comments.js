// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

// Parse body of incoming requests
app.use(bodyParser.json());

// Create in-memory database
const commentsByPostId = {};

// Get comments by post ID
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Add comment to post
app.post('/posts/:id/comments', (req, res) => {
  // Create random ID for comment
  const commentId = randomBytes(4).toString('hex');
  // Get comment content from request body
  const { content } = req.body;
  // Get comments for post, or create empty array
  const comments = commentsByPostId[req.params.id] || [];
  // Add new comment to array
  comments.push({ id: commentId, content });
  // Store updated comments
  commentsByPostId[req.params.id] = comments;
  // Send back comment
  res.status(201).send(comments);
});

// Start server
app.listen(4001, () => {
  console.log('Listening on 4001');
});