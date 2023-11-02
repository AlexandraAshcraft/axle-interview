import React, { useEffect } from 'react';
import { NewPatientForm } from '../components/forms/NewPatientForm.jsx';
import { NewProviderForm } from '../components/forms/NewProviderForm.jsx';
//import { NewAppointmentForm } from '../components/forms/NewAppointmentForm.jsx';
import { WeeklySchedule } from '../components/schedule/WeeklySchedule.jsx';
//import TableContainer from './TableContainer.jsx';
import { AppointmentTable } from '../components/tables/AppointmentTable.jsx';
import { useRouteLoaderData } from 'react-router-dom';

export default function MainContainer() {
  const appointmentData = useRouteLoaderData('home');

  console.log(appointmentData);
  return (
    <div className='main-container'>
      <div className='addNewButtons'>
        <NewPatientForm />
        <NewProviderForm />
        {/* <NewAppointmentForm /> */}
      </div>
      <AppointmentTable />
      {/* <TableContainer /> */}
    </div>
  );
}
