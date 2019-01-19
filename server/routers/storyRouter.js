const express = require('express');
const storyController = require('../controllers/storyController.js');

const router = express.Router();


// *** STORY ROUTES *** //

const logger = (req, res, next) => {
  console.log('hit logger');
  next();
};


// get a single story
router.get('/', storyController.getStoryData, (req, res) => res.send('here\'s your story!'));

// create a single story
router.post('/', logger, storyController.create, (req, res) => res.send('saved your story!'));

// get all (nearby) story pins
router.get('/all', storyController.getAllNearby, (req, res) => res.send('I got you all these ding dang stories!'));

// generic test route '/story/test'
router.get('/test', (req, res) => res.send('👄🦇🐠\n🐠👄🦇\n🦇🐠👄\n'));


module.exports = router;
