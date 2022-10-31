import React, { Component , useEffect, useState} from 'react';

import {backend} from "../../config"
import Classifier from '../Classifier/Classifier';


function Classifiers(props) {

const [models, setModels] = useState([])

function getModels() {
let models_1 = []
// Runs after the first render() lifecycle
console.log("Did mount called");
models_1 = fetch(`${backend}/info`).then((result) => {
if (result.ok) {
    result.json().then((body) => {
        setModels(body);
        
    });
}

});
return models_1;
}

useEffect(() => {
    getModels()
}, [models])

 return (
    <div>
        Hello
        {/* {models.map((item,index)=>{

        return <Classifier key={index} />

        })} */}
    </div>
 );
 
}
export default Classifiers;  