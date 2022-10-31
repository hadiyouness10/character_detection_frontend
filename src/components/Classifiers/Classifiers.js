import React, { Component , useEffect, useState} from 'react';

import {backend} from "../../config"
import Classifier from '../Classifier/Classifier';


function Classifiers(props) {

    const [models, setModels] = useState([]);

    useEffect(() => {
        getModels();
    }, [models])

    function getModels() {
        axios.get(backend + '/info').then((response) => {
            console.log(response)
            setModels(response.data.models);
    })
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