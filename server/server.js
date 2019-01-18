require('dotenv').config(); // attach vars in .ENV file to node process object
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { PORT } = process.env;


// apply global middlewares
app.use(bodyParser.json());

// initial test route
app.get('/', (req, res) => res.send('👄🦇🐠'));


// NO ROUTES BELOW HERE
// !! ERROR HANDLER !! //
// in middleware, pass a string to next
// that string will be err -> selects specific error
// any error messages that are returned from db, etc.
// are stored on res.locals.error in middleware
app.use((err, req, res, next) => {
  const log = res.local.error;
  switch (err) {
    default:
      console.log(`Unhandled error event: ${log}`);
      res.status(500).send('Server encountered an error');
  }
});


app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
