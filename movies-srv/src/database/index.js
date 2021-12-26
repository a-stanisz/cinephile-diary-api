const mongoose = require('mongoose');

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_SRV_NAME,
  DB_PORT
} = process.env;

const connect = (dbName) => {
  const connURI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_SRV_NAME}:${DB_PORT}/${dbName}?authSource=admin&readPreference=primary&ssl=false`;
  setTimeout(() => {
    mongoose.connect(connURI)
      .then(console.log(`connected to the database at port ${DB_PORT}`))
      .catch(err => console.log(err));
  }, 2000);
}

module.exports = connect;