const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
const router = require('./routes');

mongoose.connect(DB);

// <-- временный мидлвер
app.use((req, res, next) => {
  req.user = {
    _id: '638cb3490c45072e864bd586',
  };

  next();
});
// временный мидлвер -->

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});
