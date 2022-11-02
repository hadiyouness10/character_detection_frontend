import React from 'react';
import Classifiers from '../components/Classifiers/Classifiers'
import Methods from '../components/Methods/Methods';
import { backend } from '../config';

function Predict() {


  const [image, setImage] = React.useState();  
  const chooseImage = (message) => {

    setImage(message);
  };

  async function handlePredict(e) {
 
    let reader = new FileReader();
    let blob = await fetch(image).then((r) => r.blob());
    console.log(blob);
    reader.readAsDataURL(blob);
    reader.onload = function () {
      console.log(reader.result);
      // URL.revokeObjectURL(image);
      setImage();

      const req = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin":"*" },
        body: JSON.stringify({ image: reader.result }),
      };

      fetch(`${backend}/predict`, req).then((postRes) => {
        // we now get the id, and fetch the result in 0.5s
        console.log("FETCHED")
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
    <div className="app">
      <Classifiers/>
      <Methods chooseImage={chooseImage}/>
      <button onClick={handlePredict} className="btn btn-secondary button" style={{marginLeft:'45%' , fontSize: '30px'}}>Predict</button>
  </div>
  );
}

export default Predict;