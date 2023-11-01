import React from 'react';
import { Table } from '../components/tables/Table.jsx';
import { useContext } from 'react';
import { StoreContext } from '../context/globalContext.jsx';

export default function TableContainer() {
  const { activeTable, setActiveTable } = useContext(StoreContext);

  const handleClick = e => {
    setActiveTable(e.target.value);
  };

  return (
    <div className='result-container'>
      <div className='filter-buttons'>
        <button onClick={handleClick} value='appointments'>
          Appointments
        </button>
        <button onClick={handleClick} value='patients'>
          Patients
        </button>
        <button onClick={handleClick} value='providers'>
          Providers
        </button>
      </div>
      <div className='displayedTable'>
        <Table activeTable={activeTable} />
      </div>
    </div>
  );
}
