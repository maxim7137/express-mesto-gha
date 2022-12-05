const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();
/*
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
 */
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json()); // чтобы было body в запросе

// <-- временный мидлвер
app.use((req, res, next) => {
  req.user = {
    _id: '638cb3490c45072e864bd586',
  };

  next();
});
// временный мидлвер -->

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
