const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.PG_URI;

//creating query pool
const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (text, params, callback) => {
    console.log('Executed Query: ', text);
    return pool.query(text, params, callback);
  },
};

module.exports = db;
