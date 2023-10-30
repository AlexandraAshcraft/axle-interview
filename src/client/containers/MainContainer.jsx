import React, { useState } from 'react';
import TestContent from '../components/TestContent';

export default function MainContainer() {
  const [count, setCount] = useState(0);

  return (
    <div className='main-container'>
      <TestContent />
    </div>
  );
}
