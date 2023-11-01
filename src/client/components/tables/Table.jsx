import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/globalContext';
import { getTableData, deleteTableRow } from '../../api/tableData.js';
import { DeleteConfirmation } from '../forms/DeleteConfirmation.jsx';

export const Table = activeTable => {
  //   const { allAppointments, setAllAppointments } = useContext(StoreContext);
  //   const { allPatients, setAllPatients } = useContext(StoreContext);
  //   const { allProviders, setAllProviders } = useContext(StoreContext);
  const [tableData, setTableData] = useState();
  const [columnNames, setColumnNames] = useState([]);

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

  const handleModify = row => {};

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
        <tr className='column-names'>
          {columnNames.map(column => {
            return <th key={column}>{column}</th>;
          })}
        </tr>
        {tableData
          ? tableData.map(row => {
              const values = Object.values(row);
              const id = values[0];
              console.log('id', id);
              return (
                <div className='row'>
                  <tr key={id}>
                    {values.map(value => {
                      return <td key={value}>{value}</td>;
                    })}
                  </tr>
                  <div className='modify_and_delete'>
                    <button onClick={() => deleteData(values[0])}>
                      Modify
                    </button>
                    <button id={id}>
                      <DeleteConfirmation activeTable={activeTable} />
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </table>
    </div>
  );
};
