const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const connectDatabase = require('./utils/database');

const menuRoutes = require('./routes/menuRoutes');
// // const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json()); // application/json
// app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1', menuRoutes);
// // app.use('/auth', authRoutes);

// Error middleware
// Will execute only an error is thrown or forwarded with 'next(err)' method
app.use((error, req, res, next) => {
  // console.log('An ERROR: ', error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status || 500).json({
    success: false,
    message: message,
    data: data,
  });
});

// Connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
