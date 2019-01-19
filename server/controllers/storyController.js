

const story = {};

story.getAllNearby = (req, res, next) => {
  // TODO: get id and location info for pins in scope of map
  console.log('just got nearby stories from db!');
  next();
};

story.getStoryData = (req, res, next) => {
  // TODO: query the db for all data about one story
  console.log('here\'s all the data for one story');
  next();
};

story.create = (req, res, next) => {
  // TODO: insert a story into the db
  console.log(req.body);
  console.log('just created a story in the db!');
  next();
};

module.exports = story;
