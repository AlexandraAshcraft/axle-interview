const express = require('express');
const apptController = require('../controllers/apptController');

const apptRouter = express.Router();

apptRouter.get('/', apptController.getAppointmentsByDate, async (req, res) => {
  return res.status(200).json(res.locals.appointmentsByDate);
});
apptRouter.get(
  '/:apptId',
  apptController.getAppointmentById,
  async (req, res) => {
    return res.status(200).json(res.locals.appointment);
  },
);
apptRouter.get(
  '/patient/:patientId',
  apptController.getAppointmentsByPatient,
  async (req, res) => {
    return res.status(200).json(res.locals.patientAppointments);
  },
);
apptRouter.get(
  '/provider/:providerId',
  apptController.getProviderAppointmentsByDate,
  async (req, res) => {
    return res.status(200).json(res.locals.providerAppointmentsByDate);
  },
);
apptRouter.post('/', apptController.createAppointment, async (req, res) => {
  return res.status(200).json(res.locals.newAppointment);
});
apptRouter.delete(
  '/:apptId',
  apptController.deleteAppointment,
  async (req, res) => {
    return res.status(200).json(res.locals.deletedAppointment);
  },
);
apptRouter.patch(
  '/:apptId',
  apptController.modifyAppointment,
  async (req, res) => {
    return res.status(200).json(res.locals.updatedAppointment);
  },
);

module.exports = apptRouter;
