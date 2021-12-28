const mongoose = require('mongoose');

mongoose.set('debug', true);

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const connect = async () => {
  try {
    const connURI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin&readPreference=primary&ssl=false`;
    await mongoose.connect(connURI);
  } catch(err) {
    console.error(err);
  }
}

module.exports = connect;