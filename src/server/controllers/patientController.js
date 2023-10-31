import db from '../models/sqlModel.js';

const patientController = {};

patientController.createPatient = async (req, res, next) => {
  try {
    console.log('req body', req.body);
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

    //create unique identifier from phone and last name
    const patient_id = last_name + phone;

    const queryStr = `INSERT INTO patients VALUES ('${patient_id}', '${first_name}', '${last_name}', '${date_of_birth}', '${street_address}', '${city}', '${state}', '${zipcode}', '${phone}', '${insurance_provider}');`;

    //query database
    await db.query(queryStr);

    res.locals.newPatient = 'Patient added to database.';
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
    const { patient_id } = req.params;

    await db.query(`DELETE FROM patients WHERE patient_id = '${patient_id}';`);

    res.locals.deletedPatient = 'Patient deleted from database.';
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
    const { patient_id } = req.params;
    if (!req.body)
      return next({
        log: 'Error in patientController modifyPatient. Invalid request, must include modifications to patient.',
        status: 400,
        message:
          'Invalid request: Must include patient identifier to modify the patient in the database.',
      });

    //filter out the patientId to get an array of the attributes being modified
    const attributesToUpdate = Object.entries(req.body);

    //generates query string from req body
    let queryStr = attributesToUpdate
      .map(([key, value]) => `${key} = '${value}', `)
      .join('');

    //removes extra space and comma at the end
    queryStr = queryStr.slice(0, -2);

    await db.query(
      `UPDATE patients SET ${queryStr} WHERE patient_id = '${patient_id}';`,
    );

    res.locals.updatedPatient = 'Patient updated in database.';
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
    const { patient_id } = req.params;

    const patient = await db.query(
      `SELECT * FROM patients WHERE patient_id = '${patient_id}';`,
    );

    res.locals.patient = patient.rows[0];
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
    res.locals.allPatients = allPatients.rows;
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

export default patientController;
