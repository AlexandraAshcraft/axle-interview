const { db } = require('../models/sqlModel');

const apptController = {};

apptController.createAppointment = async (req, res, next) => {
  try {
    const {
      patient_id,
      provider_id,
      date,
      start_time,
      end_time,
      type,
      status,
    } = req.body;
    if (
      !patient_id ||
      !provider_id ||
      !date ||
      !start_time ||
      !end_time ||
      !type ||
      !status
    ) {
      return next({
        log: 'Invalid request, all fields are required to create an appointment in the database.',
        status: 400,
        message:
          'Invalid request, all fields are required to create an appointment in the database.',
      });
    }
    const appointment_id = date + start_time + provider_id;

    const newAppointment = await db.query(
      `INSERT INTO appointments VALUES ('${appointment_id}', '${patient_id}', '${provider_id}', '${date}', '${start_time}', '${end_time}', '${type}', '${status}');`,
    );

    res.locals.newAppointment = newAppointment;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController createAppointment when creating appointment in database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not create appointment in database.' },
    });
  }
};

apptController.deleteAppointment = async (req, res, next) => {
  try {
    const { appointment_id } = req.body;
    if (!appointment_id)
      return next({
        log: 'Error in apptController deleteAppointment. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please provide an appointment identifier for the appointment you wish to delete.',
        },
      });

    const deletedAppointment = await db.query(
      `DELETE FROM appointment WHERE appointment_id = '${appointment_id}';`,
    );

    res.locals.deletedAppointment = 'Appointment deleted.';
    next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController deleteAppointment when deleting appointment from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not delete appointment from database.' },
    });
  }
};

apptController.modifyAppointment = async (req, res, next) => {
  try {
    const updates = {
      appointment_id: req.body.appointment_id,
      patient_id: req.body.patient_id,
      provider_id: req.body.provider_id,
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      type: req.body.type,
      status: req.body.status,
    };
    if (!updates[appointment_id])
      return next({
        log: 'Error in apptController modifyAppointment. Invalid request, must include appointment identifier.',
        status: 400,
        message:
          'Invalid request: Must include appointment identifier to modify the appointment in the database.',
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

    const updatedAppointment = await db.query(
      `UPDATE appointments SET ${queryStr} WHERE appointment_id = '${updates.appointment_id}';`,
    );

    res.locals.updatedAppointment = updatedAppointment;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController modifyAppointment when modifying appointment data in database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not modify appointment data in database.' },
    });
  }
};

apptController.getAppointmentById = async (req, res, next) => {
  try {
    const { appointment_id } = req.body;
    if (!appointment_id)
      return next({
        log: 'Error in apptController getAppointmentById. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please include appointment identifier.',
        },
      });

    const appointment = await db.query(
      `SELECT * FROM appointments WHERE appointment_id = '${appointment_id}';`,
    );

    res.locals.appointment = appointment;
    next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController getAppointmentById when fetching appointment from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch appointment from database' },
    });
  }
};

apptController.getAppointmentsByPatient = async (req, res, next) => {
  try {
    const { patient_id } = req.body;
    if (!patient_id)
      return next({
        log: 'Error in apptController getAppointmentByPatient. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please include patient identifier to get the patient appointments.',
        },
      });

    const patientAppointments = await db.query(
      `SELECT * FROM appointments WHERE patient_id = '${patient_id}';`,
    );

    res.locals.patientAppointments = patientAppointments;
    next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController getAppointmentsByPatient when fetching appointments from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch patient appointments from database' },
    });
  }
};

apptController.getAppointmentsByDate = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.body;
    if (!start_date || !end_date)
      return next({
        log: 'Error in apptController getAppointmentsByDate. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please include date range for appointments.',
        },
      });

    const appointmentsByDate = await db.query(
      `SELECT * FROM appointments WHERE date BETWEEN '${start_date}' AND '${end_date}';`,
    );

    res.locals.appointmentsByDate = appointmentsByDate;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController getAppointments when fetching appointments from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch appointments from database.' },
    });
  }
};

apptController.getProviderAppointmentsByDate = async (req, res, next) => {
  try {
    const { provider_id, start_date, end_date } = req.body;
    if (!provider_id || !start_date || !end_date)
      return next({
        log: 'Error in apptController getAppointmentsByDate. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please include provider identifier and date range for appointments.',
        },
      });

    const providerAppointmentsByDate = await db.query(
      `SELECT * FROM appointments WHERE provider_id = '${provider_id}' AND date BETWEEN '${start_date}' AND '${end_date}';`,
    );

    res.locals.providerAppointmentsByDate = providerAppointmentsByDate;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController getAppointments when fetching appointments from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch appointments from database.' },
    });
  }
};

apptController.fetchData = async (req, res, next) => {
  try {
    const data = await fetch('');
    const parsedData = data.map();
    res.locals.data = parsedData;
    return next();
  } catch (error) {
    return next({
      log: 'Error caught in apptController fetchData',
      error,
      status: 500,
      message: {
        err: 'An error occurred when fetching data from the database.',
      },
    });
  }
};

module.exports = apptController;
