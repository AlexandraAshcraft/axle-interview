// import { useState, useContext, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { StoreContext } from '../../context/globalContext';
// import {
//   getInitialPatients,
//   getInitialProviders,
// } from '../../api/tableData.jsx';

// export const NewAppointmentForm = () => {
//   const [open, setOpen] = useState(false);
//   const [apptType, setApptType] = useState(null);
//   const [providerList, setProviderList] = useState([]);
//   const [patientList, setPatientList] = useState([]);
//   const [filteredProviders, setFilteredProviders] = useState([]);

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     reset();
//   };

//   const handleTypeChange = e => {
//     const type = e.target.value;
//     console.log(type);
//     setApptType(type);
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   useEffect(() => {
//     try {
//       const patients = getInitialPatients();
//       setPatientList(patients);

//       const providers = getInitialProviders();
//       setProviderInfo(providers);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   const createAppointment = async formData => {
//     const data = await fetch('/api/v1/appointments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then(data => console.log(data))
//       .catch(error => console.log(error));
//   };

//   const submitForm = async formData => {
//     const patient_id = patients.filter(patient => {
//       patient.first_name === formData.first_name &&
//         patient.last_name === formData.last_name;
//     })['patient_id'];
//     const provider_id = providers.filter(provider => {
//       provider.first_name === formData.first_name &&
//         provider.last_name === formData.last_name;
//     })['provider_id'];

//     const requestBody = {
//       patient_id: patient_id,
//       provider_id: provider_id,
//       date: formData.date,
//       start_time: formData.start_time,
//       end_time: formData.end_time,
//       type: formData.type,
//       status: formData.status,
//     };

//     createAppointment(requestBody);

//     return reset();
//   };

//   useEffect(() => {
//     const controller = new AbortController();

//     const filterProviders = providerList.filter(
//       provider => provider[2] === apptType,
//     );
//     setFilteredProviders(filterProviders);
//     return () => {
//       controller.abort();
//     };
//   }, [apptType]);

//   return (
//     <div className='form' id='appointment-form'>
//       <button onClick={handleClickOpen}>Create Appointment</button>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Create Appointment</DialogTitle>

//         <DialogContent>
//           <form onSubmit={handleSubmit(submitForm)}>
//             <label htmlFor='patient_name'>Patient Name:</label>
//             <select {...register('patient_name')}>
//               {patientList &&
//                 patientList.map(patient => {
//                   const name = `${patient.first_name + patient.last_name}`;
//                   const id = patient.patient_id;
//                   return (
//                     <option key={id} patient_id={id} value={name}>
//                       {name}
//                     </option>
//                   );
//                 })}
//             </select>
//             {errors.patient_name && <p>{errors.patient_name.message}</p>}
//             <label htmlFor='type'>Appointment Type:</label>
//             <select
//               {...register('type')}
//               id='type'
//               onChange={() => handleTypeChange()}>
//               <option value='Vaccinations'>Vaccinations</option>
//               <option value='Bloodwork'>Bloodwork</option>
//               <option value='Physical Therapy'>Physical Therapy</option>
//               <option value='Occupational Therapy'>Occupational Therapy</option>
//               <option value='Primary Care'>Primary Care</option>
//               <option value='Dialysis'>Dialysis</option>
//             </select>
//             {errors.type && <p>{errors.type.message}</p>}
//             <label htmlFor='provider_name'>Provider Name:</label>
//             <select {...register('provider_name')}>
//               <option>Select Your Provider:</option>
//               {filteredProviders
//                 ? filteredProviders.map(provider => {
//                     const name = provider.first_name + provider.last_name;
//                     const id = provider.provider_id;
//                     const specialty = provider.specialty;
//                     return (
//                       <option key={id} provider_id={id} value={name}>
//                         {name}
//                       </option>
//                     );
//                   })
//                 : providerList.map(provider => {
//                     const name = provider.first_name + provider.last_name;
//                     const id = provider.provider_id;
//                     const specialty = provider.specialty;
//                     return (
//                       <option key={id} provider_id={id} value={name}>
//                         {name}
//                       </option>
//                     );
//                   })}
//             </select>
//             {errors.provider_name && <p>{errors.provider_name.message}</p>}
//             <input
//               {...register('date', {
//                 required: {
//                   value: true,
//                   message: 'This field is required.',
//                 },
//               })}
//               id='appointment-date-input'
//               type='date'
//             />
//             {errors.date && <p>{errors.date.message}</p>}
//             <label htmlFor='start_time'>Appointment Time:</label>
//             <input
//               {...register('start_time', {
//                 required: {
//                   value: true,
//                   message: 'This field is required.',
//                 },
//                 min: '08:00',
//                 max: '17:00',
//               })}
//               id='appointment-start_time-input'
//               type='time'
//             />
//             {errors.start_time && <p>{errors.start_time.message}</p>}
//             <label htmlFor='end_time'>End Time:</label>
//             <input
//               {...register('end_time', {
//                 required: {
//                   value: true,
//                   message: 'This field is required.',
//                 },
//                 min: '09:00',
//                 max: '18:00',
//               })}
//               id='appointment-end_time-input'
//               type='time'
//             />
//             {errors.end_time && <p>{errors.end_time.message}</p>}

//             <label htmlFor='status'>Status:</label>
//             <select {...register('status')} id='appt-status'>
//               <option value='Requested'>Requested</option>
//             </select>
//             {errors.type && <p>{errors.type.message}</p>}
//             <button type='submit'>Submit</button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
