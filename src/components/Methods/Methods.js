import axios from "axios";
import React, { useEffect, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { backend } from "../../config";
import exportAsImage from "../../utils/exportAsImage";
import "../Methods/Methods.css";

function Methods({ pickedClassifier }) {

  const [features, setFeatures] = useState([]);
  const [checked, setChecked] = useState('');
  const [result, setResult] = useState('');
  const [image, setImage] = useState();
  const [draw, setDraw] = useState(true);
  const hiddenFileInput = React.useRef(null);
  const exportRef = React.useRef();
  const [models, setModels] = useState([]);

function getModels() {
  axios.get(backend + '/info').then((response) => {
    let available_models = response.data.available_models;
        console.log(available_models)
        setModels(available_models);
})
}
  useEffect(() => {
    console.log('rerendering')
    getModels();
    console.log('hello')
}, [draw, result])

  const handleClick = (event) => {
    setDraw(false);
    hiddenFileInput.current.click();
    console.log(image);
  };

  const handleDraw = () => {
    setDraw(!draw);
  }
  const [lines, setLines] = useState([]);
  const isDrawing = React.useRef(false);
  
  const handleMouseDown = (e) => {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y] }]);
  };


  const handleMouseMove = (e) => {
      // no drawing - skipping
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
  
      // To draw line
      let lastLine= lines[lines.length - 1];
      
      if(lastLine) {
          // add point
          lastLine.points = lastLine.points.concat([point.x, point.y]);
              
          // replace last
          lines.splice(lines.length - 1, 1, lastLine);
          setLines(lines.concat());
      }
      
  };
  onkeydown = (event) => {
    console.log(event.keyCode);
    if (event.keyCode === 8) {
        if (lines.length > 0) {
            setLines(lines.splice(0, lines.length - 1));
        }
    }
}
  const handleMouseUp = () => {
    isDrawing.current = false;
    console.log(lines)
  };

  async function handlePredict() {
    let base64;
    if (draw) {
      base64 = await exportAsImage(exportRef.current, 'test')
    }
    else {
      let blob = await fetch(image).then(r => r.blob());
      base64 = await blobToBase64(blob);
    }
    let json_image = {
      'image': base64, 
      'model_version': checked
    }
    axios.post(backend + '/predict', json_image).then((response) => {
        console.log('response')
        console.log(response);

        setResult(response.data.word);
    })
  }
  async function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  async function addImage() {
    if (hiddenFileInput) {
      console.log("GOT A FILE!");
      if (typeof image != "undefined") {
        URL.revokeObjectURL(image);
        // let base64 = getBase64FromUrl(image);
        // console.log('base64')
        // console.log(base64)
      }

      setImage(URL.createObjectURL(hiddenFileInput.current.files[0]));
    }
  }

  function pickClassifierFunction(model) {
   setChecked(model)
  }
  
  function checkClassifier() {
    // console.log('setting check to true');
    // console.log(props.modelName);
    // setChecked(true);
  }
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data)
      };
    });
  };
  return (
    <div style={{justifyContent: 'center', alignItems: 'center', marginLeft: '20px'}}>
      <div className="row">
              {Object.keys(models).map((model)=>{
        
                return <div className="col-4" style={floatChild} onClick={() => pickClassifierFunction(model)}>
                <div className="card" onClick={() => checkClassifier()} style={{ width: '450px', height: '200px', borderStyle: checked === model? 'solid': 'initial',  boxShadow: '2px 2px 25px 2px rgba(0, 0, 0, 0.7)', borderWidth: '3px', margin: '1em 1.5%', borderColor: 'green' }}>
    <div style={{fontSize: 18, padding: 10}}>
          Model: {model}
    </div>
    <div className="card-desc">
      Features: {models[model]['features'].map(feature => {
        return (
          <p>{feature}</p>
        )
      })}
  </div>
                    <div className="card-actions">
                      <div  id="inline">
                        <div>
                          <p>Evaluation Score: {models[model]['eval_accuracy']}</p>
                          <p>Testing Score: {models[model]['test_score']}</p>
                        </div>
                        <div style={{paddingLeft: '150px', paddingTop: '20px'}}>
                        <button type='button' className="btn btn-warning" style={{marginLeft:'45%'}}>More Info</button>

                          </div>
                        </div>

                      
    </div>
  </div>
        </div>

    })}
</div>
    <div style={{alignContent: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {addImage()}}
        />
        <button onClick={handleClick} className="btn btn-primary button" style={{marginRight: 15, fontSize: '20px'}}>Browse</button>
        <button onClick={handleDraw} className="btn btn-warning button" style={{fontSize: '20px'}}>Draw</button>
    </div>
    <div style={{alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: 20}}>
      {image !== undefined && !draw? <div className="">
        <img className="myImage" style={{width: '300px', height: '300px'}} src={image} alt="" />
      </div>
        :''}
      </div>
      <div style={{alignContent: 'center', display: 'flex', justifyContent: 'center'}} ref={exportRef}>
        {draw ?
          <Stage
            height={300}
            width={880}
            onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                className="canvas-stage"
                    style={stageStyle}
          >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                        key={i}
                        points={line.points}
                        stroke="black"
                        strokeWidth={20}
                        tension={0.5}
                        lineCap="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                        />
                    ))}
                </Layer>
          </Stage>
          : ''}
      </div>
      <button onClick={handlePredict} disabled={(checked.length === 0 || (lines.length === 0 && image === undefined)) ? true : false} className="btn btn-secondary button" style={{ marginLeft: '47%', fontSize: '30px' }}>Predict</button>
      {result.length > 0 ?
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '30px'}}>
          The predicted {result.length > 1 ? 'word' : 'letter'} is:&nbsp; <strong>{result}</strong>
        </div> : ''}
      <hr></hr>
      <hr></hr>
      <hr></hr>

    </div>
  );

}

export default Methods;


const stageStyle = {
  padding: '20px',
  margin: '10px',
  width: '60%',
  backgroundColor: 'white'
}
// const floatContainer ={
//     padding: '20px',
// }

const floatChild ={
    // width: '33%',
    float: 'left',
  paddingLeft: '20px',
}  