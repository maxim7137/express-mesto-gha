/* eslint-disable no-console */
require('dotenv').config();
const { app, DB } = require('./app');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});
