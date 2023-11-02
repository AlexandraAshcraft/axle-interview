import { useContext } from 'react';
import { StoreContext } from './globalContext';
import { Store } from '@mui/icons-material';

export const getTableData = async activeTable => {
  const { setAllProviders, setAllAppointments, setAllPatients } =
    useContext(StoreContext);

  await fetch(`/api/v1/${activeTable}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .then(data => {
      if (activeTable === 'appointments') {
        setAllAppointments(data);
      }
      if (activeTable === 'patients') {
        setAllPatients(data);
      }
      if (activeTable === 'providers') {
        setAllProviders(data);
      }
    })
    .then(data => {
      if (Array.isArray(data)) {
        const columns = Object.keys(data[0]);
        setColumnNames(columns);
        setTableData(data);
      } else {
        const columns = Object.keys(data);
        setColumnNames(columns);
        setTableData([data]);
      }
    })
    .catch(error => console.log(error));
};

export const getInitialPatients = async () => {
  const { setAllPatients } = useContext(StoreContext);
  await fetch(`/api/v1/patients/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .catch(error => console.log(error));
};
export const getInitialProviders = async () => {
  const { setAllProviders } = useContext(StoreContext);
  await fetch(`/api/v1/providers/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .catch(error => console.log(error));
};
export const getInitialAppointments = async () => {
  const { setAllAppointments } = useContext(StoreContext);
  await fetch(`/api/v1/appointments/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .then(data => {
      setAllAppointments(data);
    })
    .catch(error => console.log(error));
};

export const deleteTableRow = async (activeTable, id) => {
  const endpoint = activeTable['activeTable'];
  await fetch(`/api/v1/${endpoint}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export const modifyAppointment = async updateData => {
  const { currModifiedAppointment } = useContext(StoreContext);
  const data = await fetch(
    `/api/v1/appointments/${currModifiedAppointment.appointment_id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    },
  )
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export const modifyProvider = async updateData => {
  const { currModifiedProvider } = useContext(StoreContext);
  const data = await fetch(
    `/api/v1/providers/${currModifiedProvider.provider_id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    },
  )
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

export const modifyPatient = async updatedData => {
  const { currModifiedPatient } = useContext(StoreContext);
  const data = await fetch(
    `/api/v1/patients/${currModifiedPatient.patient_id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    },
  )
    .then(data => console.log(data))
    .catch(error => console.log(error));
};
