import express from 'express';
import patientController from '../controllers/patientController';

const patientRouter = express.Router();

patientRouter.get('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
patientRouter.get('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
patientRouter.post('/', async (req, res) => {
  return res.status(200).json(res.locals);
});
patientRouter.delete('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});
patientRouter.patch('/:id', async (req, res) => {
  return res.status(200).json(res.locals);
});

export default patientRouter;
