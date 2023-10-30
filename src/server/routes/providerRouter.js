import express from 'express';
import providerController from '../controllers/providerController';

const providerRouter = express.Router();

providerRouter.get('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
providerRouter.get('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
providerRouter.post('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
providerRouter.delete('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
providerRouter.patch('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});

export default providerRouter;
