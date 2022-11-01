import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import "./Classifier.css";

function Classifier(props) {
  const [image, setImage] = useState();
  const [prediction, setPrediction] = useState("");
  const [features, setFeatures] = useState(props.features === undefined? []: props.features);
  const hiddenFileInput = React.useRef(null);
  // if (props.features !== undefined) {
  //   setFeatures([...props.features]);
  // };
  useEffect(() => {
    console.log('re-rendering');
  }, []);



  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handlePredictionResult = (label) => {
      setPrediction(label);
  };

  subscribeToPrediction(handlePredictionResult);

  async function handlePredict(e) {
    console.log("sending prediction request!");
    console.log(image);

    let reader = new FileReader();
    let blob = await fetch(image).then((r) => r.blob());
    console.log(blob);
    reader.readAsDataURL(blob);
    reader.onload = function () {
      console.log(reader.result);
      URL.revokeObjectURL(image);
      setImage();

      const req = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      };

function Classifier(props) {
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
		<button type='button' className="btn btn-warning" style={{float: 'right', margin: 20}}>More Info</button>
	</div>
</div>
  );
}

export default Classifier;
