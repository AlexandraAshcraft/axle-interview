import { useEffect, useState } from 'react';


export const PatientsTable = patients => {
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

  useEffect(() => {
    const columns = Object.keys(patients[0]);
    setColumnNames(columns);
  }, []);

  return (
    <div>
      <h4>Patients:</h4>
      <table>
        <tr className='column-names'>
          {columnNames.map(column => {
            return <th key={column}>{column}</th>;
          })}
        </tr>
        {patients &&
          patients.map(patient => {
            const values = Object.values(patient);
            return (
              <tr key={patient.patient_id}>
                {values.map(value => {
                  return <td key={value}>{value}</td>;
                })}
              </tr>
            );
          })}
      </table>
    </div>
  );
};
