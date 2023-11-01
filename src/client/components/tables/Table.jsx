import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/globalContext';

export const Table = activeTable => {
  //   const { allAppointments, setAllAppointments } = useContext(StoreContext);
  //   const { allPatients, setAllPatients } = useContext(StoreContext);
  //   const { allProviders, setAllProviders } = useContext(StoreContext);
  const [tableData, setTableData] = useState();
  const [columnNames, setColumnNames] = useState([]);

  //   const getAppointments = async () => {
  //     const data = await fetch(`/api/v1/appointments/`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then(data => data.json())
  //       .then(data => console.log(data))
  //       .then(data => setAllAppointments(data))
  //       .catch(error => console.log(error));
  //   };

  const getTableData = async activeTable => {
    await fetch(`/api/v1/${activeTable}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
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

  useEffect(() => {
    const controller = new AbortController();

    const queryParam = activeTable['activeTable'];

    getTableData(queryParam);

    return () => {
      controller.abort();
    };
  }, [activeTable]);

  return (
    <div>
      <table>
        <thead>Data:</thead>
        <tr className='column-names'>
          {columnNames.map(column => {
            return <th key={column}>{column}</th>;
          })}
        </tr>
        {tableData
          ? tableData.map(row => {
              const values = Object.values(row);
              console.log('values', values);
              return (
                <tr key={values[0]}>
                  {values.map(value => {
                    return <td key={value}>{value}</td>;
                  })}
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
};
