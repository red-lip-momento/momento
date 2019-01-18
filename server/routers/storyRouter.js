const express = require('express');

const router = express.Router();


// *** STORY ROUTES *** //


// get a single story
router.get('/', (req, res) => res.send('here\'s your story!'));

// create a single story
router.post('/', (req, res) => res.send('saved your story!'));

// get all (nearby) story pins
router.get('/all', (req, res) => res.send('I got you all these ding dang stories!'));

// generic test route '/story/test'
router.get('/test', (req, res) => res.send('👄🦇🐠\n🐠👄🦇\n🦇🐠👄\n'));


module.exports = router;
