import express from 'express';
import providerController from '../controllers/providerController';

const providerRouter = express.Router();

providerRouter.get(
  '/',
  providerController.getAllProviders,
  async (req, res) => {
    return res.status(200).json(res.locals.providers);
  },
);
providerRouter.get(
  '/:id',
  providerController.getProviderById,
  async (req, res) => {
    return res.status(200).json(res.locals.provider);
  },
);
providerRouter.post(
  '/',
  providerController.createProvider,
  async (req, res) => {
    return res.status(200).json(res.locals.newProvider);
  },
);
providerRouter.delete(
  '/:id',
  providerController.deleteProvider,
  async (req, res) => {
    return res.status(200).json(res.locals.deletedProvider);
  },
);
providerRouter.patch(
  '/:id',
  providerController.modifyProvider,
  async (req, res) => {
    return res.status(200).json(res.locals.updatedProvider);
  },
);

export default providerRouter;