import express from 'express';
import apptController from '../controllers/apptController';

const apptRouter = express.Router();

apptRouter.get('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
apptRouter.get('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
apptRouter.post('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
apptRouter.delete('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
apptRouter.patch('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});

export default apptRouter;
