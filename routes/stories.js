const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .then(stories =>
      res.render('stories/index', {
        stories: stories
      })
    );
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

router.get('/edit', (req, res) => {
  res.render('stories/edit');
});

router.get('/show', (req, res) => {
  res.render('stories/show');
});

router.post('/', (req, res) => {
  let allowComments;
  allowComments = req.body.allowComments ? true : false;

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  };

  new Story(newStory).save().then(story => {
    res.redirect('/stories/show/${story.id}');
  });
});

module.exports = router;
