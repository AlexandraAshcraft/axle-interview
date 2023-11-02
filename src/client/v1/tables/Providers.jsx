import { useEffect, useState } from 'react';


export const ProvidersTable = providers => {
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
    const columns = Object.keys(providers[0]);
    setColumnNames(columns);
  }, []);

  return (
    <div>
      <h4>Providers:</h4>
      <table>
        <tr className='column-names'>
          {columnNames.map(column => {
            return <th key={column}>{column}</th>;
          })}
        </tr>
        {providers &&
          providers.map(provider => {
            const values = Object.values(provider);
            return (
              <tr key={provider.provider_id}>
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
