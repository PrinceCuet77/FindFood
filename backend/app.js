const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const multer = require('multer');

// const feedRoutes = require('./routes/feed');
// const authRoutes = require('./routes/auth');

const app = express();
// const MONGODB_URL =
//   'mongodb+srv://prince77:mbqySd2nQW8TTIlJ@cluster0.4qkcpn3.mongodb.net/post-rest-api?retryWrites=true&w=majority&appName=Cluster0';

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.use('/feed', feedRoutes);
// app.use('/auth', authRoutes);

// Error middleware
// Will execute only an error is thrown or forwarded with 'next(err)' method
app.use((error, req, res, next) => {
  console.log('An ERROR: ', error);
  const status = error.httpStatusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status || 500).json({
    message: message,
    data: data,
  });
});

// mongoose
//   .connect(MONGODB_URL)
//   .then(() => {
//     console.log('CONNECTED');
//     app.listen(8085);
//   })
//   .catch((err) => console.log(err));

app.listen(8080);
