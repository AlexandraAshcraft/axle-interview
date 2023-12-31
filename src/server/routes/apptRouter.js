// const express = require('express');
// const apptController = require('../controllers/apptController');
import express from 'express';
import apptController from '../controllers/apptController.js';
import patientController from '../controllers/patientController.js';
import providerController from '../controllers/providerController.js';

const apptRouter = express.Router();

apptRouter.get(
  '/',
  apptController.getAllAppointments,
  patientController.getPatientNames,
  providerController.getProviderNames,
  async (req, res) => {
    console.log('response', res.locals.appointments)
    return res.status(200).json(res.locals.appointments);
  },
);
apptRouter.get(
  '/:appointment_id',
  apptController.getAppointmentById,
  async (req, res) => {
    return res.status(200).json(res.locals.appointment);
  },
);
apptRouter.get(
  '/patient/:patient_id',
  apptController.getAppointmentsByPatient,
  async (req, res) => {
    return res.status(200).json(res.locals.patientAppointments);
  },
);
apptRouter.get(
  '/provider/:provider_id',
  apptController.getAppointmentsByProvider,
  async (req, res) => {
    return res.status(200).json(res.locals.providerAppointments);
  },
);
apptRouter.get(
  '/date',
  apptController.getAppointmentsByDate,
  async (req, res) => {
    return res.status(200).json(res.locals.appointmentsByDate);
  },
);
apptRouter.get(
  '/daterange/:date',
  apptController.getAppointmentsByDateRange,
  async (req, res) => {
    return res.status(200).json(res.locals.appointmentsByDate);
  },
);

apptRouter.get(
  '/date/:start_date/:end_date',
  apptController.getAppointmentsByDateRange,
  async (req, res) => {
    return res.status(200).json(res.locals.AppointmentsByDateRange);
  },
);

apptRouter.post('/', apptController.createAppointment, async (req, res) => {
  return res.status(200).json(res.locals.newAppointment);
});

apptRouter.delete(
  '/:appointment_id',
  apptController.deleteAppointment,
  async (req, res) => {
    return res.status(200).json(res.locals.deletedAppointment);
  },
);
apptRouter.patch(
  '/:appointment_id',
  apptController.modifyAppointment,
  async (req, res) => {
    return res.status(200).json(res.locals.updatedAppointment);
  },
);

export default apptRouter;
