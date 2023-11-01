import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { StoreContext } from '../../context/globalContext';

export const AppointmentForm = appointment => {
  const [open, setOpen] = useState(false);
  const [apptType, setApptType] = useState(null);
  const [providerInfo, setProviderInfo] = useState(providerDetails());
  const {allPatients, allProviders} = useContext(StoreContext);

    const defaultValues = {
        patient_name: defaultPatientName(),
        type: appointment.type,
        provider_name: defaultProviderName(),
        date: appointment.date,
        start_time: appointment.start_time,
        status: appointment.status
    }

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleTypeChange = (e) => {
    const type = e.target.value,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });

  const createAppointment = async(formData)=>{
      const data = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(data => console.log(data))
        .catch(error => console.log(error));

  }
  const updateAppointment = async()=>{
    const data = await fetch('/api/v1/appointments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(data => console.log(data))
        .catch(error => console.log(error));
  }

  const submitForm = async formData => {
    console.log(formData);
    const patient_id = allPatients.filter(patient=> {
        patient.first_name === formData.first_name && patient.last_name === formData.last_name
    })['patient_id']
    const provider_id = allProviders.filter(provider=> {
        provider.first_name === formData.first_name && provider.last_name === formData.last_name
    })['provider_id']
  
    if (appointment){

        const updateRequestBody = {
            appointment_id: appointment.appointment_id,
            patient_id: patient_id,
            provider_id: provider_id,
            date: formData.date,
            start_time: formData.start_time,
            end_time: formData.end_time,
            type: formData.type,
            status: formData.status
        }
        const updates = Object.entries(updateRequestBody).filter(([key, value] )=> value !== appointment[key])
        updateAppointment(appointment.appointment_id, updates);
    } else {
        createAppointment(formData)
    }

    return reset();
  };

  useEffect(()=> {
    const controller = new AbortController();
    const filteredProviders = providerInfo.filter(provider => provider[2] === apptType);
    setProviderInfo(filteredProviders)
    return (()=> {controller.abort()})
  }, [apptType])


  const patientNamesAndIds = allPatients.map((patient)=> {
    [`${patient.first_name + patient.last_name}`, `${patient.patient_id}`];
})
const providerDetails = () => allProviders.map(provider=> {
  [`${provider.first_name + provider.last_name}`, `${provider.provider_id}`, `${provider.specialty}`];
})

const defaultPatientName = () => {
    const patient_id = appointment.patient_id;
    const activePatientInfo = allPatients.filter(patient => patient.patient_id === patient_id);
    return `${activePatientInfo.first_name + activePatientInfo.last_name}`
}
const defaultProviderName = () => {
    const provider_id = appointment.provider_id;
    const activeProviderInfo = allProviders.filter(provider => provider.provider_id === provider_id);
    return `${activeProviderInfo.first_name + activeProviderInfo.last_name}`
}

  return (
    <div className='form' id='appointment-form'>
      {!appointment.appointment_id ? (
        <button onClick={handleClickOpen}>Add Appointment</button>
      ) : (
        <button onClick={handleClickOpen}>Modify Appointment</button>
      )}
      <Dialog open={open} onClose={handleClose}>
        {!appointment.appointment_id ? (
          <DialogTitle>Add Appointment</DialogTitle>
        ) : (
          <DialogTitle>Modify Appointment</DialogTitle>
        )}
        <DialogContent>
          <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor='patient_name'>Patient Name:</label>
            <select {...register('patient_name')}>
                {patientNamesAndIds && patientNamesAndIds.map((name, id)=> {
                    return(
                        <option key={id} patient_id = {id} value = {name}>{name}</option>
                    )
                })}
            </select>
            {errors.patient_name && <p>{errors.patient_name.message}</p>}
            <label htmlFor='type'>Appointment Type:</label>
            <select {...register('type')} id='type' onChange={()=>handleTypeChange()}>
            <option value='Vaccinations'>Vaccinations</option>
              <option value='Bloodwork'>Bloodwork</option>
              <option value='Physical Therapy'>Physical Therapy</option>
              <option value='Occupational Therapy'>Occupational Therapy</option>
              <option value='Primary Care'>Primary Care</option>
              <option value='Dialysis'>Dialysis</option>
            </select>
            {errors.type && (
              <p>{errors.type.message}</p>
            )}
            <label htmlFor='provider_name'>Provider Name:</label>
            <select {...register('provider_name')}>
                <option>Select Your Provider:</option>
                {providerInfo && providerInfo.map((name, id)=> {
                    return(
                        <option key={id} provider_id = {id} value = {name}>{name}</option>
                    )
                })}
            </select>
            {errors.provider_name && <p>{errors.provider_name.message}</p>}
            <input
              {...register('date', {
                required: {
                  value: true,
                  message: 'This field is required.',
                }
              })}
              id='appointment-date-input'
              type='date'
            />
            {errors.date && <p>{errors.date.message}</p>}
            <label htmlFor='start_time'>Appointment Time:</label>
            <input
              {...register('start_time', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                min: '08:00',
                max: '17:00'
              })}
              id='appointment-start_time-input'
              type='time'
            />
            {errors.start_time && <p>{errors.start_time.message}</p>}
            <label htmlFor='end_time'>End Time:</label>
            <input
              {...register('end_time', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                min: '09:00',
                max: '18:00'
              })}
              id='appointment-end_time-input'
              type='time'
            />
            {errors.end_time && <p>{errors.end_time.message}</p>}

                <label htmlFor='status'>Status:</label>
                <select {...register('status')} id='appt-status' >
                <option value='Scheduled'>Scheduled</option>
                  <option value='Confirmed'>Confirmed</option>
                  <option value='Canceled'>Canceled</option>
                  <option value='No Show'>No Show</option>
                </select>
                {errors.type && (
                  <p>{errors.type.message}</p>
                )}
            <button type='submit'>Submit</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
