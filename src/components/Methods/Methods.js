import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import { backend } from "../../config";
import {predict, subscribeToPrediction} from "../API/BackendCalls";
import { Height } from "@material-ui/icons";
import "../Methods/Methods.css";

function Methods(props) {


  const [image, setImage] = useState();
  const [prediction, setPrediction] = useState("");
  const [isPredictOn, setPredict] = useState("");

  const hiddenFileInput = React.useRef(null);
  
  useEffect(() => {
    console.log("Hello")
}, [])

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

      const body = {image: reader.result}

      // predict(body)

      // console.log(`${backend}/predict`);
      fetch(`${backend}/predict`, req).then((postRes) => {
        // we now get the id, and fetch the result in 0.5s

        if (postRes.ok) {
          postRes.json().then((body) => {
            const jobId = body.jobId;

            let timer = setInterval(() => {
              fetch(`${backend}/jobinfo?jobId=${jobId}`).then((predRes) => {
                if (predRes.ok) {
                  predRes.json().then((bodyPred) => {
                    console.log(bodyPred);
                    if ("label" in bodyPred.jobResults) {
                      console.log("inside IF");
                      setPrediction(bodyPred.jobResults.label);
                      clearInterval(timer)
                    }
                  });
                }
              });
            }, 1000);
          });
        }
      });
    };
  }

  return (
    <div>
    <div style={{alignContent: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            console.log("GOT A FILE!");
            console.log(hiddenFileInput.current.files[0].name);
            if (typeof image != "undefined") URL.revokeObjectURL(image);
            setPrediction("");
            setImage(URL.createObjectURL(hiddenFileInput.current.files[0]));
          }}
        />
        <button onClick={handleClick} className="btn btn-primary" style={{marginRight: 15, fontSize: '20px'}}>Browse</button>
        <button className="btn btn-warning" style={{fontSize: '20px'}}>Draw</button>
    </div>
    <div style={{alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: 20}}>
    {image === undefined? 
        '':
            <div className="">
        <img className="myImage" style={{width: '300px', height: '300px'}} src={image} alt="" />
      </div>
        }
    </div>
    </div>
  );

}

export default Methods;
