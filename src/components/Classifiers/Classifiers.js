import React, {  useEffect, useState} from 'react';

import {backend} from "../../config"
import Classifier from '../Classifier/Classifier';
import axios from 'axios'

function Classifiers({pickClassifier}) {

    const [models, setModels] = useState([]);
    useEffect(() => {
        getModels();
    }, [pickClassifier])

    function getModels() {
        axios.get(backend + '/info').then((response) => {
            console.log(response)
            setModels(response.data.available_models);
    })
    }
    
    function pickClassifierFunction(model) {
        pickClassifier(model);

        console.log('current checked model' +  model)
    }


    return (
     <div>

    <div style={floatContainer} >
        {Object.keys(models).map((model)=>{
        
            return <div style={floatChild} onClick={() => pickClassifierFunction(model)}>
                <Classifier modelName={model} features={models[model]['features']} testing_accuracy={models[model]['testing_accuracy']} traning_accuracy={models[model]['training_accuracy']} training={models[model]['training']} />
            </div>

        })}
            </div>
     </div>
 );
 
}
export default Classifiers;  
const floatContainer ={
    padding: '20px',
}

const floatChild ={
    width: '33%',
    float: 'left',
    padding: '20px',
}  