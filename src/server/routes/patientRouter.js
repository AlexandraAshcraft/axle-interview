import express from 'express';
import patientController from '../controllers/patientController';

const patientRouter = express.Router();

patientRouter.get('/', patientController.getAllPatients, async (req, res) => {
  return res.status(200).json(res.locals.patient);
});
patientRouter.get(
  '/:id',
  patientController.getPatientById,
  async (req, res) => {
    return res.status(200).json(res.locals.patient);
  },
);
patientRouter.post('/', patientController.createPatient, async (req, res) => {
  return res.status(200).json(res.locals.newPatient);
});
patientRouter.delete(
  '/:id',
  patientController.deletePatient,
  async (req, res) => {
    return res.status(200).json(res.locals.deletedPatient);
  },
);
patientRouter.patch(
  '/:id',
  patientController.modifyPatient,
  async (req, res) => {
    return res.status(200).json(res.locals.updatedPatient);
  },
);

export default patientRouter;
