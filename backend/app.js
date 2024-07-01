const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');

dotenv.config({ path: '.env.local' });

const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');

const { corsHandleMiddleware } = require('./middleware/corsHandleMiddleware');
const {
  errorHandlerMiddleware,
} = require('./middleware/errorHandleMiddleware');

const app = express();

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json()); // application/json
// app.use(cookieParser());

app.use(corsHandleMiddleware);

app.use('/api/v1', menuRoutes);
app.use('/api/v1', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// Error middleware
// Will execute only an error is thrown or forwarded with 'next(err)' method
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
const mode = process.env.NODE_ENV;
mongoose
  .connect(process.env.DB_LOCAL_URI)
  .then((con) => {
    console.log(
      `MongoDB Database is connected with HOST: ${con.connection.host}`
    );
    app.listen(port, () => {
      console.log(`Server started on port ${port} in ${mode} mode`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
