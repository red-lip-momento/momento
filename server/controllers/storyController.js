const db = require('./../postgres/db.js'); 
const moment = require('moment');
const story = {};

story.getAllNearby = (req, res, next) => {
  const {lat, lng} = req.body;
  // Look for for all stories within 1 longitude and latitude
  const latUp = lat + .1;
  const latDown = lat - .1;
  const lngRight = lng + .1;
  const lngLeft = lng - .1;
  db.query('SELECT * FROM story WHERE lat BETWEEN $1 AND $2 AND lng BETWEEN $3 AND $4', [latDown, latUp, lngLeft,lngRight])
  .then(data => {
    // console.log('All data within .1 lat/long: ', data);
    res.locals.allPins = data;
    next();
  })
  .catch(error => {
    console.log('Error in getAllNearby: ', error);
    next(error);
  })
};

story.getInnerAndOuterPins = (req, res, next) => {
  const {lat, lng} = req.body;
  const latUp = lat + .01;
  const latDown = lat - .01;
  const lngRight = lng + .01;
  const lngLeft = lng - .01;
  // checking if values are between these inner lats
  const {allPins} = res.locals;
  const innerPins = [];
  const outerPins = [];

  allPins.forEach( el => {
    if (el.lat < latUp && el.lat > latDown && el.lng < lngRight && el.lng > lngLeft) innerPins.push(el);
    else outerPins.push(el);
  })
  res.locals.innerPins = innerPins;
  res.locals.outerPins = outerPins;
  next();
}


//   const { storyId } = req.body;
//   // Query the db for all data about one story
//   db.any('SELECT * FROM story WHERE _id=$1',[storyId])
//     .then(data =>  {
//       res.locals.storyId = data;
//       console.log('Success, got ', data);
//       next();
//     })
//     .catch(function(error) {
//       console.log('Error in getStoryData: ', error);
//       next(error);
//     });
// };

story.create = (req, res, next) => {
  const {title, story, lat, lng } = req.body;
  const currTime = moment();
  console.log(currTime);
  db.none('INSERT INTO story(story, title, created_at, lat, lng ) VALUES ($1,$2,$3,$4,$5)',[story, title, currTime, lat, lng])
    .then(() => {
      console.log('Successfully stored to Database, title: ', title)
      next();
    })
    .catch(error => {
      console.log('ERROR in Storing to Database: ', error);
      next(error);
    });
};

module.exports = story;
