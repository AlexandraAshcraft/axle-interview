import { useContext, useEffect, useState, useRef } from 'react';
import { StoreContext } from '../../v1/context/globalContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const PatientSearch = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(1);
  const [options, setOptions] = useState([]);
  const { selectedPatient, setSelectedPatient } = useContext(StoreContext);

  const getAllPatients = async () => {
    const patients = await fetch('/api/v1/patients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(patients => patients.json())
      .then(patients => console.log(patients))
      .then(patients => setOptions(patients))

      .catch(error => console.log(error));
  };

  useEffect(() => {
    const controller = new AbortController();

    getAllPatients();

    return () => {
      return controller.abort();
    };
  }, [id]);

  const dropdownRef = useRef(null);
  const onClick = e => {
    if (e.target !== dropdownRef.current) {
      setOpen(false);
    }
  };

  const filterResults = options => options.map();

  useEffect(() => {
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      setOptions([]);
    };
  }, []);

  return (
    <div className='dropdown'>
      <fieldset>
        <button
          //   type='text'
          //   onKeyUp={filterResults}
          onClick={e => {
            e.stopPropagation(), setId(Math.random() * 100);
            setOpen(prev => !prev);
          }}>
          Open
        </button>

        {open && options && (
          <div
            className='dropdown-panel'
            ref={dropdownRef}
            onClick={e => e.stopPropagation()}>
            {options.map(patient => {
              return (
                <>
                  <input
                    onChange={e => setSelectedPatient(e.target.checked)}
                    checked={patient}
                    type='checkbox'
                    key={patient.patient_id}
                  />
                  <label htmlFor={patient.patient_id}>
                    {patient.first_name + patient.last_name}
                  </label>
                </>
              );
            })}
          </div>
        )}
      </fieldset>
    </div>
  );
};

{
  /* <Autocomplete
        id='patient-search'
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isOptionEqualToValue={(option, value) => option === value}
        options={options}
        loading={loading}
        renderInput={params => <TextField {...params} />} /></> */
}
