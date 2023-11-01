import React, { useEffect } from 'react';
import { NewPatientForm } from '../components/forms/NewPatientForm.jsx';
import { NewProviderForm } from '../components/forms/NewProviderForm.jsx';
//import { NewAppointmentForm } from '../components/forms/NewAppointmentForm.jsx';
import { WeeklySchedule } from '../components/schedule/WeeklySchedule.jsx';
import TableContainer from './TableContainer.jsx';

export default function MainContainer() {

  return (
    <div className='main-container'>
      <div className='addNewButtons'>
        <NewPatientForm />
        <NewProviderForm />
        {/* <NewAppointmentForm /> */}
      </div>
      <TableContainer />
    </div>
  );
}
