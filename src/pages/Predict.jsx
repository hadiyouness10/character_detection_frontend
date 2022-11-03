import React, { useEffect, useState } from 'react';
import Classifiers from '../components/Classifiers/Classifiers'
import Methods from '../components/Methods/Methods';
import { backend } from '../config';



function Predict() {

  const [pickedClassifier, setPickedClassifier] = useState('');

  useEffect(() => {
    console.log('rerendering')
  }, [])

  const pickClassifier = (classifier) => (
    setPickedClassifier(classifier)
  );

  return (
    <div className="app">
      <Classifiers pickClassifier={pickClassifier} />
      <Methods pickedClassifier={pickedClassifier} />
  </div>
  );
}

export default Predict;