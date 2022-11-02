import React, { useEffect, useState } from "react";
import { backend } from "../../config";
import "../Methods/Methods.css";

function Methods({ chooseImage }) {


  const [image, setImage] = useState();

  const hiddenFileInput = React.useRef(null);
  
  useEffect(() => {
    console.log("Hello")
}, [])

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

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
            setImage(URL.createObjectURL(hiddenFileInput.current.files[0]));
            chooseImage(URL.createObjectURL(hiddenFileInput.current.files[0]))
          }}
        />
        <button onClick={handleClick} className="btn btn-primary button" style={{marginRight: 15, fontSize: '20px'}}>Browse</button>
        <button className="btn btn-warning button" style={{fontSize: '20px'}}>Draw</button>
    </div>
    <div style={{alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: 20}}>
      {image === undefined? '': <div className="">
        <img className="myImage" style={{width: '300px', height: '300px'}} src={image} alt="" />
      </div>
        }
    </div>
    </div>
  );

}

export default Methods;
