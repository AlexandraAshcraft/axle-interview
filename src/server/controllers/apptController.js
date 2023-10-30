import { query } from 'express';
import { db } from '../models/sqlModel';

const apptController = {};




apptController.fetchData = async (req, res, next) => {
  try {
    const data = await fetch('');
    const parsedData = data.map();
    res.locals.data = parsedData;
    return next();
  } catch (error) {
    return next({
      log: 'Error caught in apptController fetchData',
      error,
      status: 500,
      message: {
        err: 'An error occurred when fetching data from the database.',
      },
    });
  }
};

export default apptController;
