import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const NewPatientForm = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = async formData => {
    console.log(formData);
    const data = await fetch('/api/v1/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));

    return reset();
  };

  return (
    <div className='form' id='patient-form'>
      <button onClick={handleClickOpen}>Add Patient</button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Patient</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor='first_name'>First Name:</label>
            <input
              {...register('first_name', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                maxLength: 25,
                pattern: /^[A-Za-z]+$/i,
              })}
              id='first_name'
              type='text'
              placeholder='John'
            />
            {errors.first_name && <p>{errors.first_name.message}</p>}
            <label htmlFor='last_name'>Last Name:</label>
            <input
              {...register('last_name', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                maxLength: 25,
                pattern: /^[A-Za-z]+$/i,
              })}
              id='last_name'
              type='text'
              placeholder='Doe'
            />
            {errors.last_name && <p>{errors.last_name.message}</p>}
            <label htmlFor='date_of_birth'>Date of Birth:</label>
            <input
              {...register('date_of_birth', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
              })}
              id='date_of_birth'
              type='date'
              default={Date.now()}
              max={Date.now()}
            />
            {errors.date_of_birth && <p>{errors.date_of_birth.message}</p>}
            <label htmlFor='street_address'>Street Address:</label>
            <input
              {...register('street_address', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
              })}
              id='street_address'
              type='text'
              placeholder='123 Main Street, Apt 101'
            />
            {errors.street_address && <p>{errors.street_address.message}</p>}
            <label htmlFor='city'>City:</label>
            <input
              {...register('city', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                maxLength: 25,
                pattern: /^[A-Za-z]+$/i,
              })}
              id='city'
              type='text'
              placeholder='New York City'
            />
            {errors.city && <p>{errors.city.message}</p>}
            <label htmlFor='state'>State:</label>
            <select id='state' {...register('state')}>
              <option value='AL'>AL</option>
              <option value='AK'>AK</option>
              <option value='AZ'>AZ</option>
              <option value='AR'>AR</option>
              <option value='CA'>CA</option>
              <option value='CO'>CO</option>
              <option value='CT'>CT</option>
              <option value='DE'>DE</option>
              <option value='FL'>FL</option>
              <option value='GA'>GA</option>
              <option value='HI'>HI</option>
              <option value='ID'>ID</option>
              <option value='IL'>IL</option>
              <option value='IN'>IN</option>
              <option value='IA'>IA</option>
              <option value='KS'>KS</option>
              <option value='KY'>KY</option>
              <option value='LA'>LA</option>
              <option value='ME'>ME</option>
              <option value='MD'>MD</option>
              <option value='MA'>MA</option>
              <option value='MI'>MI</option>
              <option value='MN'>MN</option>
              <option value='MS'>MS</option>
              <option value='MO'>MO</option>
              <option value='MT'>MT</option>
              <option value='NE'>NE</option>
              <option value='NV'>NV</option>
              <option value='NH'>NH</option>
              <option value='NJ'>NJ</option>
              <option value='NM'>NM</option>
              <option value='NY'>NY</option>
              <option value='NC'>NC</option>
              <option value='ND'>ND</option>
              <option value='OH'>OH</option>
              <option value='OK'>OK</option>
              <option value='OR'>OR</option>
              <option value='PA'>PA</option>
              <option value='RI'>RI</option>
              <option value='SC'>SC</option>
              <option value='SD'>SD</option>
              <option value='TN'>TN</option>
              <option value='TX'>TX</option>
              <option value='UT'>UT</option>
              <option value='VT'>VT</option>
              <option value='VA'>VA</option>
              <option value='WA'>WA</option>
              <option value='WV'>WV</option>
              <option value='WI'>WI</option>
              <option value='WY'>WY</option>
            </select>
            {errors.state && <p>{errors.state.message}</p>}
            <label htmlFor='zipcode'>Zipcode:</label>
            <input
              {...register('zipcode', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                minLength: 5,
                maxLength: 5,
                pattern: /^[0-9]+$/i,
              })}
              id='zipcode'
              type='text'
              placeholder='10001'
            />
            {errors.zipcode && <p>{errors.zipcode.message}</p>}
            <label htmlFor='phone'>
              Phone Number (no dashes or parentheses):
            </label>
            <input
              {...register('phone', {
                required: {
                  value: true,
                  message: 'This field is required.',
                },
                minLength: 10,
                maxLength: 10,
                pattern: /^[0-9]+$/i,
              })}
              id='phone'
              type='number'
              placeholder='5551234567'
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <label htmlFor='insurance_provider'>Insurance Provider:</label>
            <select {...register('insurance_provider')} id='insurance_provider'>
              <option value='Aetna'>Aetna</option>
              <option value='Anthem'>Anthem</option>
              <option value='Blue Cross Blue Shield'>
                Blue Cross Blue Shield:
              </option>
              <option value='Cigna'>Cigna</option>
              <option value='Kaiser Permanente'>Kaiser Permanente</option>
              <option value='Medicare'>Medicare</option>
              <option value='UnitedHealth Group'>UnitedHealth Group</option>
            </select>
            {errors.insurance_provider && (
              <p>{errors.insurance_provider.message}</p>
            )}
            <button type='submit'>Submit</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
