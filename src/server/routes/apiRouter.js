const express = require('express');
const apiController = require('../controllers/apiController');

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

module.exports = apiRouter;
