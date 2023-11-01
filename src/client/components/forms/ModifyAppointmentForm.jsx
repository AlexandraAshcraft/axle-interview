// import { useState, useContext, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { modifyAppointment } from '../../api/tableData.jsx';
// import { StoreContext } from '../../context/globalContext';

// export const ModifyAppointmentForm = () => {
//   const [apptType, setApptType] = useState(null);
//   const [providerList, setProviderList] = useState([]);
//   const [patientList, setPatientList] = useState([]);
//   const {
//     allPatients,
//     allProviders,
//     currModifiedAppointment,
//     modifiedApptOpen,
//     setModifiedApptOpen,
//   } = useContext(StoreContext);
//   const providerDetails = () =>
//     allProviders.map(provider => {
//       [
//         `${provider.first_name + provider.last_name}`,
//         `${provider.provider_id}`,
//         `${provider.specialty}`,
//       ];
//     });
//   const [providerInfo, setProviderInfo] = useState(providerDetails());

//   console.log('hello', allPatients);
//   const patientNamesAndIds = allPatients.map(patient => {
//     [`${patient.first_name + patient.last_name}`, `${patient.patient_id}`];
//   });

//   const defaultPatientName = () => {
//     const patient_id = currModifiedAppointment.patient_id;
//     const activePatientInfo = allPatients.filter(
//       patient => patient.patient_id === patient_id,
//     );
//     return `${activePatientInfo.first_name + activePatientInfo.last_name}`;
//   };
//   const defaultProviderName = () => {
//     const provider_id = currModifiedAppointment.provider_id;
//     const activeProviderInfo = allProviders.filter(
//       provider => provider.provider_id === provider_id,
//     );
//     return `${activeProviderInfo.first_name + activeProviderInfo.last_name}`;
//   };
//   const defaultValues = {
//     patient_name: defaultPatientName(),
//     type: currModifiedAppointment.type,
//     provider_name: defaultProviderName(),
//     date: currModifiedAppointment.date,
//     start_time: currModifiedAppointment.start_time,
//     status: currModifiedAppointment.status,
//   };
//   console.log(defaultValues);

//   const handleClickOpen = () => setModifiedApptOpen(true);
//   const handleClose = () => {
//     setModifiedApptOpen(false);
//     reset();
//   };
//   const handleTypeChange = e => {
//     const type = e.target.value;
//     setApptType(type);
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: defaultValues,
//   });

//   const submitForm = async formData => {
//     console.log(formData);
//     const patient_id = allPatients.filter(patient => {
//       patient.first_name === formData.first_name &&
//         patient.last_name === formData.last_name;
//     })['patient_id'];
//     const provider_id = allProviders.filter(provider => {
//       provider.first_name === formData.first_name &&
//         provider.last_name === formData.last_name;
//     })['provider_id'];

//     const updateRequestBody = {
//       appointment_id: currModifiedAppointment.appointment_id,
//       patient_id: patient_id,
//       provider_id: provider_id,
//       date: formData.date,
//       start_time: formData.start_time,
//       end_time: formData.end_time,
//       type: formData.type,
//       status: formData.status,
//     };
//     const updates = Object.entries(updateRequestBody).filter(
//       ([key, value]) => value !== currModifiedAppointment[key],
//     );
//     modifyAppointment(currModifiedAppointment.appointment_id, updates);

//     return reset();
//   };

//   useEffect(() => {
//     const controller = new AbortController();
//     const filteredProviders = providerInfo.filter(
//       provider => provider[2] === apptType,
//     );
//     setProviderInfo(filteredProviders);
//     return () => {
//       controller.abort();
//     };
//   }, [apptType]);

//   return (
//     <div className='form' id='appointment-form'>
//       <Dialog open={modifiedApptOpen} onClose={handleClose}>
//         {currModifiedAppointment.appointment_id && (
//           <DialogTitle>Modify Appointment</DialogTitle>
//         )}
//         <DialogContent>
//           <form onSubmit={handleSubmit(submitForm)}>
//             <label htmlFor='patient_name'>Patient Name:</label>
//             <select {...register('patient_name')}>
//               {patientNamesAndIds &&
//                 patientNamesAndIds.map((name, id) => {
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
//               {providerInfo &&
//                 providerInfo.map((name, id) => {
//                   return (
//                     <option key={id} provider_id={id} value={name}>
//                       {name}
//                     </option>
//                   );
//                 })}
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
//               <option value='Scheduled'>Scheduled</option>
//               <option value='Confirmed'>Confirmed</option>
//               <option value='Canceled'>Canceled</option>
//               <option value='No Show'>No Show</option>
//             </select>
//             {errors.type && <p>{errors.type.message}</p>}
//             <button type='submit'>Submit</button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
