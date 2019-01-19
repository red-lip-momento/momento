const moment = require('moment');
const db = require('./../postgres/db.js');

const story = {};

story.getAllNearby = (req, res, next) => {
  const { lat, lng } = req.body;
  // Look for for all stories within 1 longitude and latitude
  const latUp = lat + 0.1;
  const latDown = lat - 0.1;
  const lngRight = lng + 0.1;
  const lngLeft = lng - 0.1;
  db.query('SELECT * FROM story WHERE lat BETWEEN $1 AND $2 AND lng BETWEEN $3 AND $4', [latDown, latUp, lngLeft, lngRight])
    .then((data) => {
      // console.log('All data within .1 lat/long: ', data);
      res.locals.allPins = data;
      next();
    })
    .catch((error) => {
      console.log('Error in getAllNearby: ', error);
      next(error);
    });
};

story.getInnerAndOuterPins = (req, res, next) => {
  const { lat, lng } = req.body;
  const latUp = lat + 0.01;
  const latDown = lat - 0.01;
  const lngRight = lng + 0.01;
  const lngLeft = lng - 0.01;
  // checking if values are between these inner lats
  const { allPins } = res.locals;
  const innerPins = [];
  const outerPins = [];

  allPins.forEach((el) => {
    if (el.lat < latUp && el.lat > latDown && el.lng < lngRight && el.lng > lngLeft) innerPins.push(el);
    else outerPins.push(el);
  });
  res.locals.innerPins = innerPins;
  res.locals.outerPins = outerPins;
  next();
};


story.create = (req, res, next) => {
  const {
    title, story, lat, lng,
  } = req.body;
  const currTime = moment();
  console.log(currTime);
  db.one('INSERT INTO story(story, title, created_at, lat, lng ) VALUES ($1,$2,$3,$4,$5) RETURNING *', [story, title, currTime, lat, lng])
    .then(() => {
      console.log('Successfully stored to Database, title: ', title);
      next();
    })
    .catch((error) => {
      console.log('ERROR in Storing to Database: ', error);
      next(error);
    });
};

module.exports = story;
