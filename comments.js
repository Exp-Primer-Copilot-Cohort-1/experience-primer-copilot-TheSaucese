// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload'
});
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

// Path: /comments
// Create a new comment
router.post('/', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.author = req.payload.username;
  comment.save(function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Path: /comments/:comment
// Return a comment
router.get('/:comment', function(req, res, next) {
  req.comment.populate('comments', function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Path: /comments/:comment/upvote
// Upvote a comment
router.put('/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Path: /comments/:comment/downvote
// Downvote a comment
router.put('/:comment/downvote', auth, function(req, res, next) {
  req.comment.downvote(function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Path: /comments/:comment/edit
// Edit a comment
router.put('/:comment/edit', auth, function(req, res, next) {
  req.comment.update(req.body, function(err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

// Path: /comments/:comment/delete
// Delete a comment
router.delete('/:comment/delete', auth, function(req, res, next) {
  req.comment.remove(function(err) {
    if (err) { return next(err); }
    res.json(req.comment);
  });
});

// Path: /comments/: