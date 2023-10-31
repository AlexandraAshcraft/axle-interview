const db = require('../models/sqlModel');

const patientController = {};

patientController.createPatient = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      street_address,
      city,
      state,
      zipcode,
      phone,
      insurance_provider,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !date_of_birth ||
      !street_address ||
      !city ||
      !state ||
      !zipcode ||
      !phone ||
      !insurance_provider
    )
      return next({
        log: 'Invalid request, all fields are required to create a patient in the database.',
        status: 400,
        message:
          'Invalid request, all fields are required to create a patient in the database.',
      });

    const patient_id = last_name + phone;

    const queryStr = `INSERT INTO patients VALUES ('${patient_id}', '${first_name}', '${last_name}', '${date_of_birth}', '${street_address}', '${city}', '${state}', '${zipcode}', '${phone}', '${insurance_provider}');`;

    const newPatient = await db.query(queryStr);
    console.log('returned database data', newPatient);

    res.locals.newPatient = newPatient;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in patientController createPatient when creating patient in database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not create patient in database.' },
    });
  }
};

patientController.deletePatient = async (req, res, next) => {
  try {
    const { patient_id } = req.body;
    if (!patient_id)
      return next({
        log: 'Error in patientController deletePatient. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please provide a patient identifier for the patient you wish to delete.',
        },
      });

    const deletedPatient = await db.query(
      `DELETE FROM patients WHERE patient_id = '${patient_id}';`,
    );

    res.locals.deletedPatient = 'Patient deleted.';
    next();
  } catch (error) {
    return next({
      log: {
        'Error in patientController deletePatient when fetching patient from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not delete patient from database.' },
    });
  }
};
patientController.modifyPatient = async (req, res, next) => {
  try {
    const updates = {
      patient_id: req.body.patient_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      insurance_provider: req.body.insurance_provider,
    };
    if (!updates[patient_id])
      return next({
        log: 'Error in patientController modifyPatient. Invalid request, must include patient identifier.',
        status: 400,
        message:
          'Invalid request: Must include patient identifier to modify the patient in the database.',
      });

    const updatedAttributes = Object.entries().filter(
      (key, value) => key !== null && key !== undefined,
    );
    console.log('updatedAttributes', updatedAttributes);

    const queryStr = '';

    //builds columns and updated values for query string
    updatedAttributes.forEach(attribute => {
      queryStr + `${attribute[0]} = '${attribute[1]}',`;
    });

    //removes comma at the end
    queryStr = queryStr.slice(-1);

    const updatedPatient = await db.query(
      `UPDATE patients SET ${queryStr} WHERE patient_id = '${req.body.patient_id}';`,
    );

    res.locals.updatedPatient = updatedPatient;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in patientController modifyPatient when modifying patient data in database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not modify patient data in database.' },
    });
  }
};

patientController.getPatientById = async (req, res, next) => {
  try {
    const { patient_id } = req.body;
    if (!patient_id)
      return next({
        log: 'Error in patientController getPatientById. Invalid request.',
        status: 400,
        message: { err: 'Invalid request: Please include patient identifier.' },
      });

    const patient = await db.query(
      `SELECT * FROM patients WHERE patient_id = '${patient_id}';`,
    );

    res.locals.patient = patient;
    next();
  } catch (error) {
    return next({
      log: {
        'Error in patientController getPatientById when fetching patient from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch patient from database' },
    });
  }
};
patientController.getAllPatients = async (_req, res, next) => {
  try {
    const allPatients = await db.query(`SELECT * FROM patients;`);

    res.locals.allPatients = allPatients;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in patientController getAllPatients when fetching patients from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch patients from database.' },
    });
  }
};

patientController.fetchData = async (req, res, next) => {
  try {
    const data = await fetch('');
    const parsedData = data.map();
    res.locals.data = parsedData;
    return next();
  } catch (error) {
    return next({
      log: 'Error caught in patientController fetchData',
      error,
      status: 500,
      message: {
        err: 'An error occurred when fetching data from the database.',
      },
    });
  }
};

module.exports = patientController;
