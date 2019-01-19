require('dotenv').config(); // attach vars in .ENV file to node process object
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { PORT } = process.env;
const storyRouter = require('./routers/storyRouter.js');


// apply global middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.locals.error = '';
  res.locals.storyData = {};
  next();
});

// initial test route
app.get('/', (req, res) => res.send('👄🦇🐠'));

// route requests to '/story' to storyRouter
app.use('/story', storyRouter);


// NO ROUTES BELOW HERE
// !! ERROR HANDLER !! //
app.use((err, req, res, next) => {
  const log = res.locals.error;

  switch (err) {
    default:
      console.log(`Unhandled error event: ${log} ${err}`);
      res.status(500).send('Server encountered an error');
  }
});


app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
