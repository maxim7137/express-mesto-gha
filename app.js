const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
const router = require('./routes');

mongoose.connect(DB);

// <-- временный мидлвер
app.use((req, res, next) => {
  req.user = { _id: '6391c55b0484de7e00378cac' };

  next();
});
// временный мидлвер -->
router.use(express.json()); // мидлвер для body

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`App connect to dateBase ${DB}`);
});
