import React from 'react';
import Classifiers from '../components/Classifiers/Classifiers'
import Methods from '../components/Methods/Methods';
import { backend } from '../config';

function Predict() {

  return (
    <div className="app">
      <Classifiers/>
      <Methods/>
  </div>
  );
}

export default Predict;