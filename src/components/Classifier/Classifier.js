import React, { useState } from "react";
import "./Classifier.css";


function Classifier(props) {
  const [isChecked, setChecked] = useState(false);


  return (
    <div className= {`card ${isChecked === true && "checked"}`} onClick={() => setChecked(!isChecked)}>
	<div className="card-title">
    Model: {props.modelName}	
	</div>
	<div className="card-desc">
    Features: {props.features}
    </div>
	<div className="card-actions">
		<button type='button' className='card-action-readMore'>More Info</button>
	</div>
</div>
  );
}

export default Classifier;
