import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//require routers
//import apiRouter from './routes/apiRouter';
import cartRouter from './routes/cartRouter.js';
import bookRouter from './routes/bookRouter.js';
import patientRouter from './routes/patientRouter.js';
import providerRouter from './routes/providerRouter.js';
import apptRouter from './routes/apptRouter.js';
// const apiRouter = require('./routes/apiRouter');
// const patientRouter = require('./routes/patientRouter');
// const providerRouter = require('./routes/providerRouter');
// const apptRouter = require('./routes/apptRouter');

//convert incoming requests to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
//app.use('/api/v1/endpoints', apiRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/providers', providerRouter);
app.use('/api/v1/appointments', apptRouter);

//static handling for FULL BUILD (dev uses vite proxy server)
if (process.env.NODE.ENV !== 'dev') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

//serve index.html explicitly in production mode
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

//Route error handler
app.use((req, res) => {
  console.log('Bad incoming request from ' + req.originalUrl);
  res.status(404).send('Oops! This page does not exist.');
});

//Global error handler
app.use((err, _req, res, _next) => {
  const defaultErr = {
    log: 'Error caught in global error handler.',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
