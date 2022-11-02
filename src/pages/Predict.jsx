import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Classifiers from '../components/Classifiers/Classifiers'
import Methods from '../components/Methods/Methods';

function Predict() {
  return (
    <div className="app">
      <Classifiers/>
      <Methods/>
  </div>
  );
}

export default Predict;