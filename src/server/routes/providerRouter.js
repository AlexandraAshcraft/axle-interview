const express = require('express');
const providerController = require('../controllers/providerController');

const providerRouter = express.Router();

providerRouter.get(
  '/',
  providerController.getAllProviders,
  async (req, res) => {
    return res.status(200).json(res.locals.providers);
  },
);
providerRouter.get(
  '/:provider_id',
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
  '/:provider_id',
  providerController.deleteProvider,
  async (req, res) => {
    return res.status(200).json(res.locals.deletedProvider);
  },
);
providerRouter.patch(
  '/:provider_id',
  providerController.modifyProvider,
  async (req, res) => {
    return res.status(200).json(res.locals.updatedProvider);
  },
);

module.exports = providerRouter;
