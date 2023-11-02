import express from 'express';
import apiController from '../controllers/apiController.js';

const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
bookRouter.get('/:book_id', async (req, res) => {
  return res.status(200).json(res.locals);
});
bookRouter.get('/authors/:author_id', async (req, res) => {
  return res.status(200).json(res.locals);
});
// bookRouter.get('/:book_title', async (req, res) => {
//   return res.status(200).json(res.locals);
// });
// bookRouter.get('/genres/:genre_id', async (req, res) => {
//   return res.status(200).json(res.locals);
// });

export default bookRouter;
