import React, {  useEffect, useState} from 'react';

import {backend} from "../../config"
import Classifier from '../Classifier/Classifier';
import axios from 'axios'

function Classifiers(props) {

    const [models, setModels] = useState([]);

    useEffect(() => {
        getModels();
    }, [])

    function getModels() {
        axios.get(backend + '/info').then((response) => {
            console.log(response)
            setModels(response.data.available_models);
    })
}


 return (
    <div className ="cards-row" >
        {Object.keys(models).map((model)=>{
        
        return <Classifier modelName = {model} features = {models[model]['features']} testing_accuracy={models[model]['testing_accuracy']} traning_accuracy={models[model]['training_accuracy']} training={models[model]['training']} />

        })}
    </div>
 );
 
}
export default Classifiers;  