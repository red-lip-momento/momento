const express = require('express');
const storyController = require('../controllers/storyController.js');

const router = express.Router();


// *** STORY ROUTES *** //

const logger = (req, res, next) => {
  console.log('hit logger');
  next();
};

// get specific story
router.post('/' , storyController.getStory, (req,res) => {
  res.json(res.locals.storyId);
})

// get all story
router.post('/all', storyController.getAllNearby, storyController.getInnerAndOuterPins, (req, res) => {
  res.json( {
    outerPins: res.locals.outerPins,
    innerPins: res.locals.innerPins
  })})

// create a single story
router.post('/create', logger, storyController.create, (req, res) => res.sendStatus(200));

// generic test route '/story/test'
router.get('/test', (req, res) => res.send('👄🦇🐠\n🐠👄🦇\n🦇🐠👄\n'));


module.exports = router;
