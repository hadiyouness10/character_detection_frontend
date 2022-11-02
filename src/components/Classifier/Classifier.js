import React, { useEffect, useState } from "react";
import "./Classifier.css";

function Classifier(props) {
  const [features, setFeatures] = useState(props.features === undefined? []: props.features);
  const [isChecked, setChecked] = useState(false);


  return (
    <div className="card">
    <div className="card-title">
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
