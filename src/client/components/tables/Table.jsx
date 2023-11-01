import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/globalContext';
import { getTableData, deleteTableRow } from '../../api/tableData.jsx';
import { DeleteConfirmation } from '../forms/DeleteConfirmation.jsx';
//import { ModifyAppointmentForm } from '../forms/ModifyAppointmentForm.jsx';
import { ModifyProviderForm } from '../forms/ModifyProviderForm.jsx';
import { ModifyPatientForm } from '../forms/ModifyPatientForm.jsx';

export const Table = activeTable => {
  const [tableData, setTableData] = useState();
  const [columnNames, setColumnNames] = useState([]);
  const {
    currModifiedAppointment,
    setCurrModifiedAppointment,
    setCurrModifiedPatient,
    setCurrModifiedProvider,
    modifiedApptOpen,
    setModifiedApptOpen,
    modifiedPatientOpen,
    setModifiedPatientOpen,
    modifiedProviderOpen,
    setModifiedProviderOpen,
    deleteConfirmationOpen,
    setDeleteConfirmationOpen,
  } = useContext(StoreContext);
  const type = activeTable['activeTable'];

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

  const handleClickOpen = row => {
    if (type === 'appointments') {
      setModifiedApptOpen(true);
    }
    if (type === 'patients') setModifiedPatientOpen(true);
    if (type === 'providers') setModifiedProviderOpen(true);
  };
  const handleClose = () => {
    if (type === 'appointments') setModifiedApptOpen(false);
    if (type === 'patients') setModifiedPatientOpen(false);
    if (type === 'providers') setModifiedProviderOpen(false);
  };

  const handleModifyRow = row => {
    if (type === 'appointments') {
      setCurrModifiedAppointment(row);
    }
    if (type === 'patients') {
      setCurrModifiedPatient(row);
    }
    if (type === 'providers') {
      setCurrModifiedProvider(row);
    }
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
                    <button
                      onClick={() => {
                        handleModifyRow(row);
                        handleClickOpen();
                      }}>
                      Modify
                    </button>
                    <button onClick={() => deleteTableRow(activeTable, id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </table>
      {/* {type === 'appointments' && (
        <ModifyAppointmentForm open={modifiedApptOpen} onClose={handleClose} />
      )} */}
      {type === 'patients' && (
        <ModifyPatientForm open={modifiedPatientOpen} onClose={handleClose} />
      )}
      {type === 'providers' && (
        <ModifyProviderForm open={modifiedProviderOpen} onClose={handleClose} />
      )}
    </div>
  );
};
