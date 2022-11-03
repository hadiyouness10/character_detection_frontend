import React, { useEffect, useState } from "react";
import "./Classifier.css";

function Classifier(props) {
  const [features, setFeatures] = useState(props.features === undefined? []: props.features);
  const [checked, setChecked] = useState(false);

  function checkClassifier() {
    // console.log('setting check to true');
    // console.log(props.modelName);
    // setChecked(true);
  }
  return (
    <div className="card" onClick={() => checkClassifier()} style={{ width: '450px', height: '200px', borderStyle: checked === props.modelName ? 'solid': 'initial',  boxShadow: '2px 2px 25px 0px rgba(0, 0, 0, 0.7)', borderWidth: '3px', margin: '1em 1.5%', borderColor: 'green' }}>
    <div style={{fontSize: 18, padding: 10}}>
          Model: {props.modelName}
    </div>
    <div className="card-desc">
      Features: {features.map(feature => {
        return (
          <p>{feature}</p>
        )
      })}
  </div>
    <div className="card-actions">
      <button type='button' className="btn btn-warning" style={{marginLeft:'45%'}}>More Info</button>
    </div>
  </div>
  );
}

export default Classifier;
