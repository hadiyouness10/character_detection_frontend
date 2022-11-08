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
      <div style={{display: 'block', justifyContent: 'center', alignItems: 'center'}}>
      {/* <Classifiers pickClassifier={pickClassifier} /> */}

      </div>

      <div >

      <Methods pickedClassifier={pickedClassifier} />

      </div>
  </div>
  );
}

export default Predict;