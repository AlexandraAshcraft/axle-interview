// import React from 'react';
// import { Table } from '../components/tables/Table.jsx';
// import { useContext } from 'react';
// import { StoreContext } from '../context/globalContext.jsx';
// import { NewPatientForm } from '../components/forms/NewPatientForm.jsx';
// import { NewProviderForm } from '../components/forms/NewProviderForm.jsx';
// //import { NewAppointmentForm } from '../components/forms/NewAppointmentForm.jsx';

// export default function TableContainer() {
//   const { activeTable, setActiveTable } = useContext(StoreContext);

//   const handleClick = e => {
//     setActiveTable(e.target.value);
//   };

//   return (
//     <div className='result-container'>
//       <h2>Axle Health</h2>
//       <div className='filter-buttons'>
//         <button onClick={handleClick} value='patients'>
//           Patients
//         </button>
//         <button onClick={handleClick} value='providers'>
//           Providers
//         </button>
//         <button onClick={handleClick} value='appointments'>
//           Appointments
//         </button>
//       </div>
//       <div className='displayedTable'>
//         <Table activeTable={activeTable} />
//       </div>
//     </div>
//   );
// }
