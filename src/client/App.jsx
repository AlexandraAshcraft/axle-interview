import './assets/style.scss';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import Home from './Routes/Home.jsx';
import * as loaders from './context/loaders.js';
import { AppointmentTable } from './Pages/Appointments.jsx';
import { PatientTable } from './Pages/Patients.jsx';
import { ProviderTable } from './Pages/Providers.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Home />}
      loader={loaders.appointmentsLoader}
      id='home'
      // errorElement={<ErrorElement />}
    >
      <Route
        path='/appointments'
        element={<AppointmentTable />}
        id='appointments'
      />
      <Route
        path='/patients'
        element={<PatientTable />}
        loader={loaders.patientsLoader}
        id='patients'
      />
      <Route
        path='/providers'
        element={<ProviderTable />}
        loader={loaders.providersLoader}
        id='providers'
      />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
