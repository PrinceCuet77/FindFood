

const app = require('./app');

// // const connectDatabase = require('./config/database');

// // const cloudinary = require('cloudinary');

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.log(`ERROR: ${err.stack}`);
//   console.log('Shutting down due to uncaught exceptions');
//   process.exit(1);
// });

console.log(process.env.NODE_ENV);

// Setting up config file
// if (process.env.NODE_ENV !== 'PRODUCTION')

console.log('---------', process.env.NODE_ENV);

// // Connecting to database
// // connectDatabase();

// // Setting up cloudinary config
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// const server = app.listen(process.env.PORT, () => {
//   console.log(
//     `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
//   );
// });

// // Handle unhandled
// process.on('unhandledRejection', (err) => {
//   console.log(`ERROR: ${err.stack}`);
//   console.log('Shutting down server due to Unhandled Promise rejection.');
//   server.close(() => {
//     process.exit(1);
//   });
// });


