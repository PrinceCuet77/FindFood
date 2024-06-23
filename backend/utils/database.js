const mongoose = require('mongoose');

console.log(process.env.DB_LOCAL_URI);

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((con) => {
      console.log(
        `MongoDB Database is connected with HOST: ${con.connection.host}`
      );
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
