import React, { useState } from 'react';
import TestContent from '../components/TestContent';
import { PatientForm } from '../components/PatientForm.jsx';
import { ProviderForm } from '../components/ProviderForm.jsx';

export default function MainContainer() {
  return (
    <div className='main-container'>
      <PatientForm />
      <ProviderForm />
    </div>
  );
}
