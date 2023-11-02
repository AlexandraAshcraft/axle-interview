import express from 'express';
import apiController from '../controllers/apiController.js';

const cartRouter = express.Router();

cartRouter.get('/:user_id', async (req, res) => {
  return res.status(200).json(res.locals);
});
cartRouter.post('/:user_id/:book_id', async (req, res) => {
  return res.status(200).json(res.locals);
});
cartRouter.delete('/:user_id/:book_id', async (req, res) => {
  return res.status(200).json(res.locals);
});
cartRouter.patch('/:user_id/:book_id', async (req, res) => {
  return res.status(200).json(res.locals);
});
cartRouter.patch('/:user_id', async (req, res) => {
  return res.status(200).json(res.locals);
});

export default cartRouter;
