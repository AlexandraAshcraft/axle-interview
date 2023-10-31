import db from '../models/sqlModel.js';
import crypto from 'crypto';

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
    const appointment_id = crypto.randomUUID();

    await db.query(
      `INSERT INTO appointments VALUES ('${appointment_id}', '${patient_id}', '${provider_id}', '${date}', '${start_time}', '${end_time}', '${type}', '${status}');`,
    );

    res.locals.newAppointment = 'Appointment created';
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
    const { appointment_id } = req.params;

    await db.query(
      `DELETE FROM appointments WHERE appointment_id = '${appointment_id}';`,
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
    const { appointment_id } = req.params;
    console.log(appointment_id);
    if (!req.body)
      return next({
        log: 'Error in apptController modifyAppointment. Invalid request, must include modifications to appointment.',
        status: 400,
        message:
          'Invalid request: Must include appointment identifier to modify the appointment in the database.',
      });

    const attributesToUpdate = Object.entries(req.body);
    //builds columns and updated values for query string
    let queryStr = attributesToUpdate
      .map(([key, value]) => `${key} = '${value}', `)
      .join('');

    //removes comma at the end
    queryStr = queryStr.slice(0, -2);

    await db.query(
      `UPDATE appointments SET ${queryStr} WHERE appointment_id = '${appointment_id}';`,
    );
    res.locals.updatedAppointment = 'Appointment updated in database.';
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
    const { appointment_id } = req.params;

    const appointment = await db.query(
      `SELECT * FROM appointments WHERE appointment_id = '${appointment_id}';`,
    );

    res.locals.appointment = appointment.rows[0];
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
    const { patient_id } = req.params;

    const patientAppointments = await db.query(
      `SELECT * FROM appointments WHERE patient_id = '${patient_id}';`,
    );
    res.locals.patientAppointments = patientAppointments.rows;
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

apptController.getAppointmentsByProvider = async (req, res, next) => {
  try {
    const { provider_id } = req.params;
    const appointmentsByProvider = await db.query(
      `SELECT * FROM appointments WHERE provider_id = '${provider_id}';`,
    );
    console.log(appointmentsByProvider.rows);
    res.locals.appointmentsByProvider = appointmentsByProvider.rows;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in apptController getAppointmentsByProvider when fetching appointments from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch provider appointments from database.' },
    });
  }
};

apptController.getAppointmentsByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    const dateStr =
      date.slice(0, 4) +
      '-' +
      date.slice(4, 6) +
      '-' +
      date.slice(6) +
      'T07:00:00.000Z';

    const appointmentsByDate = await db.query(
      `SELECT * FROM appointments WHERE date = '${dateStr}';`,
    );

    res.locals.appointmentsByDate = appointmentsByDate.rows;
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

apptController.getAppointmentsByDateRange = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.params;

    const startDateStr =
      start_date.slice(0, 4) +
      '-' +
      start_date.slice(4, 6) +
      '-' +
      start_date.slice(6) +
      'T07:00:00.000Z';

    const endDateStr =
      end_date.slice(0, 4) +
      '-' +
      end_date.slice(4, 6) +
      '-' +
      end_date.slice(6) +
      'T07:00:00.000Z';

    const appointmentsByDateRange = await db.query(
      `SELECT * FROM appointments WHERE date BETWEEN '${startDateStr}' AND '${endDateStr}';`,
    );

    console.log(appointmentsByDateRange.rows);
    res.locals.appointmentsByDateRange = appointmentsByDateRange.rows;
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

// apptController.getProviderAppointmentsByDate = async (req, res, next) => {
//   try {
//     const { provider_id, start_date, end_date } = req.params;
//     if (!provider_id || !start_date || !end_date)
//       return next({
//         log: 'Error in apptController getAppointmentsByDate. Invalid request.',
//         status: 400,
//         message: {
//           err: 'Invalid request: Please include provider identifier and date range for appointments.',
//         },
//       });

//     const providerAppointmentsByDate = await db.query(
//       `SELECT * FROM appointments WHERE provider_id = '${provider_id}' AND date BETWEEN '${start_date}' AND '${end_date}';`,
//     );

//     res.locals.providerAppointmentsByDateRange = providerAppointmentsByDate;
//     return next();
//   } catch (error) {
//     return next({
//       log: {
//         'Error in apptController getAppointments when fetching appointments from database: ':
//           error,
//       },
//       status: 500,
//       message: { err: 'Could not fetch appointments from database.' },
//     });
//   }
// };

export default apptController;
