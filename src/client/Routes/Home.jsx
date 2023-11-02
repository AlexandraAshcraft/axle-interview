import React, { useEffect } from 'react';
import { NewPatientForm } from '../v1/forms/NewPatientForm.jsx';
import { NewProviderForm } from '../v1/forms/NewProviderForm.jsx';
//import { NewAppointmentForm } from '../components/forms/NewAppointmentForm.jsx';
import { WeeklySchedule } from '../components/schedule/WeeklySchedule.jsx';
//import TableContainer from './TableContainer.jsx';
import { AppointmentTable } from '../Pages/Appointments.jsx';
import {
  NavLink,
  useNavigate,
  Outlet,
  useRouteLoaderData,
} from 'react-router-dom';

export default function Home() {
  const appointmentData = useRouteLoaderData('home');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') return navigate('/appointments');
  });

  return (
    <div className='main-container'>
      <div className='addNewButtons'>
        <NewPatientForm />
        <NewProviderForm />
        {/* <NewAppointmentForm /> */}
      </div>
      {/* <AppointmentTable /> */}
      <nav>
        <NavLink to={'/appointments'}>Appointments</NavLink>
        <NavLink to={'/patients'}>Patients</NavLink>
        <NavLink to={'/providers'}>Providers</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
