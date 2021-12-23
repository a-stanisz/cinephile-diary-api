const mongoose = require('mongoose');

const connect = async (
  dbUsername,
  dbUserPsswrd,
  dbHost,
  dbPort,
  dbName
) => {
  const connStr = `mongodb://${dbUsername}:${dbUserPsswrd}@${dbHost}:${dbPort}/${dbName}`;
  try {
    await mongoose.connect(connStr);
    console.log(`connected to the database at port ${dbPort}`);
  } catch (err) {
    console.log('mongodb connection failed!', err);
  }
}

exports.connect = connect;