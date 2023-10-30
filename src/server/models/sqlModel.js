import { Pool } from 'pg';
import 'dotenv/config';

//connection string imported from .env
const PG_URI = process.env.PG_URI;

//creating query pool
const pool = new Pool({
  connectionString: PG_URI,
});

export const db = {
  query: (text, params, callback) => {
    console.log('Executed Query: ', text);
    return pool.query(text, params, callback);
  },
};
