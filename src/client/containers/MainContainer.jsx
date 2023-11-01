import React from 'react';
import { PatientForm } from '../components/forms/PatientForm.jsx';
import { ProviderForm } from '../components/forms/ProviderForm.jsx';
import { WeeklySchedule } from '../components/schedule/WeeklySchedule.jsx';
import TableContainer from './TableContainer.jsx';

export default function MainContainer() {
  return (
    <div className='main-container'>
      <div className='addNewButtons'>
        <PatientForm />
        <ProviderForm />
      </div>
      {/* <WeeklySchedule /> */}
      <TableContainer />
    </div>
  );
}
