import React, { useState } from 'react';
import TestContent from '../components/TestContent';
import { NewPatientForm } from '../components/NewPatientForm';

export default function MainContainer() {
  return (
    <div className='main-container'>
      <NewPatientForm />
    </div>
  );
}
