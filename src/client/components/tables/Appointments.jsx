import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/globalContext';

export const AppointmentsTable = appointments => {
  const { allAppointments, setAllAppointments } = useContext(StoreContext);
  const [columnNames, setColumnNames] = useState([
    'provider_id',
    'first_name',
    'last_name',
    'specialty',
    'street_address',
    'city',
    'state',
    'zipcode',
    'phone',
  ]);

  const getAppointments = async () => {
    const data = await fetch(`/api/v1/appointments/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .then(data => console.log(data))
      .then(data => setAllAppointments(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    console.log('appointments', appointments);
    console.log('allAppointments', allAppointments);
    setAllAppointments(allAppointments);
  }, []);

  return (
    <div>
      <h4>Appointments:</h4>
      <table>
        <tr className='column-names'>
          {columnNames.map(column => {
            return <th key={column}>{column}</th>;
          })}
        </tr>
        {/* {appointments
          ? appointments.map(appointment => {
              const values = Object.values(appointment);
              console.log('values', values);
              return (
                <tr key={appointment.appointment_id}>
                  {values.map(value => {
                    return <td key={value}>{value}</td>;
                  })}
                </tr>
              );
            })
          : null} */}
      </table>
    </div>
  );
};
