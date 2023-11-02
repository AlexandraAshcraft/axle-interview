export const bookLoader = async () => {
  try {
    const res = await fetch('/api/v1/books/', {
      method: 'GET',
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const appointmentsLoader = async () => {
  try {
    const res = await fetch('/api/v1/appointments');
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const patientsLoader = async () => {
  try {
    const res = await fetch('/api/v1/patients');
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const providersLoader = async () => {
  try {
    const res = await fetch('/api/v1/providers');
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
