const mongoose = require('mongoose');

const mongo_url = 'mongodb://localhost:27017/crm';

mongoose.connect(mongo_url);

const db = mongoose.connection;

db.once('error', (error) => {
  console.log('error in connectiong to db');
});

db.once('open', () => {
  console.log('connected to db');
});

module.exports = db;
