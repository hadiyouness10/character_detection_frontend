import axios from "axios";
import React, { useEffect, useState } from "react";
import { Layer, Line, Stage } from "react-konva";
import { backend } from "../../config";
import exportAsImage from "../../utils/exportAsImage";
import "../Methods/Methods.css";

function Methods({ chooseImage }) {


  const [image, setImage] = useState();
  const [draw, setDraw] = useState();
  const hiddenFileInput = React.useRef(null);
  const exportRef = React.useRef();
  useEffect(() => {
    console.log("Hello")
}, [draw])

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

  async function predict() {
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
      'model_version': 'svm'
    }
      axios.post(backend + '/predict', json_image).then((response) => {
        console.log(response);
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
      chooseImage(URL.createObjectURL(hiddenFileInput.current.files[0]))
    }
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
    <div>
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
            width={430}
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
      <button onClick={() => predict()}>
          Predict
          </button>
    </div>
  );

}

export default Methods;


const stageStyle = {
  padding: '20px',
  margin: '10px',
  width: '30%',
  boxShadow: '1px 2px 9px #F4AAB9',
  backgroundColor: 'white'
}