import express from 'express';
import apptController from '../controllers/apptController';

const apptRouter = express.Router();

apptRouter.get(
  '/',
  apptController.getAllAppointmentsByDate,
  async (req, res) => {
    return res.status(200).json(res.locals.allAppointmentsByDate);
  },
);
apptRouter.get('/:id', apptController.getAppointmentById, async (req, res) => {
  return res.status(200).json(res.locals.appointment);
});
apptRouter.post('/', apptController.createAppointment, async (req, res) => {
  return res.status(200).json(res.locals.newAppointment);
});
apptRouter.delete(
  '/:id',
  apptController.deleteAppointment,
  async (req, res) => {
    return res.status(200).json(res.locals.deletedAppointment);
  },
);
apptRouter.patch('/:id', apptController.modifyAppointment, async (req, res) => {
  return res.status(200).json(res.locals.updatedAppointment);
});

export default apptRouter;
