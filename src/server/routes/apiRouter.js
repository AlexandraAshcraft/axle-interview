import express from 'express';
import apiController from '../controllers/apiController';

const apiRouter = express.Router();

apiRouter.get('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
apiRouter.get('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
apiRouter.post('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
apiRouter.delete('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
apiRouter.patch('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});

export default apiRouter;
