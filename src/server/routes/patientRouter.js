// const express = require('express');
// const patientController = require('../controllers/patientController');
import express from 'express';
import patientController from '../controllers/patientController.js';

const patientRouter = express.Router();

patientRouter.get('/', patientController.getAllPatients, async (req, res) => {
  return res.status(200).json(res.locals.patient);
});

patientRouter.get(
  '/:patient_id',
  patientController.getPatientById,
  async (req, res) => {
    return res.status(200).json(res.locals.patient);
  },
);

patientRouter.post('/', patientController.createPatient, async (req, res) => {
  return res.status(200).json(res.locals.newPatient);
});

patientRouter.delete(
  '/:patient_id',
  patientController.deletePatient,
  async (req, res) => {
    return res.status(200).json(res.locals.deletedPatient);
  },
);

patientRouter.patch(
  '/:patient_id',
  patientController.modifyPatient,
  async (req, res) => {
    return res.status(200).json(res.locals.updatedPatient);
  },
);

export default patientRouter;
