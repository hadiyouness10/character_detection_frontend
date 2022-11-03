import React, { Component , useEffect, useState} from 'react';

import {backend} from "../../config"
// import Classifier from '../Classifier/Classifier';
import axios from 'axios';
import { Stage, Layer, Line, Rect, Circle, Group, Text } from 'react-konva';
import Form from 'react-bootstrap/Form';

function TrainingComponent(props) {

    const [models, setModels] = useState([]);

    const [checked, setChecked] = useState([]);
    const [isTraining, setTraining] = useState(false);

    const [features, setFeatures] = useState(['pixels_per_segment', 'horizontal_histogram', 'vertical_histogram'])


    function getFeatures() {
        axios.get(backend + '/features').then((response) => {
            setFeatures(response.data.features);
    })
    }

    function changeWeight(item, target) {
        console.log(item);
        console.log(target.target.value);
        let currentClassifiers = [...classifiers];
        for (var i = 0; i < currentClassifiers.length; i++){
            if (currentClassifiers[i] === item) {
                currentClassifiers[i]['w'] = target.target.value;
            }
        }
        setClassifiers(currentClassifiers);
    }

    const [inputLines, setinputLines] = useState([
        {
            startingPoint: [350, 50],
            endingPoint: [150, 200],
            dash: 10
        },
        {
            startingPoint: [350, 50],
            endingPoint: [350, 200],
            dash: 10

        },
        {
            startingPoint: [350, 50],
            endingPoint: [550, 200],
            dash: 10

        }]);
    
        const [outputLines, setoutputLines] = useState([
        {
            startingPoint: [350, 450],
            endingPoint: [150, 300],
            dash: 10

        },
        {
            startingPoint: [350, 450],
            endingPoint: [350, 300],
            dash: 10

        },
        {
            startingPoint: [350, 450],
            endingPoint: [550, 300],
            dash: 10

        }
    ]);
    const [classifiers, setClassifiers] = useState([
        {
            x: 100,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false,
            name: 'knn',
            w: 1,
            features: [],
        },
        {
            x: 300,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'svm', 
            w: 1,
            features: []
        },
        {
            x: 500,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'dt', 
            w: 1, 
            features: []
        }
    ]);
    function renderFeatures() {
        var featuresRender = [];
        var featuresColumn = [];
        for (var i = 0; i < features.length; i++){
            featuresColumn.push(
                <div  key={i}>
                <input value={features[i]} onChange={(e)=>handleCheck(e)} type="checkbox"/>
                    <span  style={{ marginLeft: 10, display: 'inline' }}>{features[i]}</span>
            </div>
            );
            if ((i+1) % 5 === 0) {
                featuresRender.push(
                    <div style={floatChildFeature}>
                    {featuresColumn}
                    </div>
                )
                featuresColumn = [];
            }
        }
        return featuresRender;
    }

    function onDoubleClick(i) {
        console.log('double clicked' + i)
        let currentClassifiers = [...classifiers];
        let currentinputLines = [...inputLines];
        let currentoutputLines = [...outputLines];
        if (currentClassifiers[i]['picked']) {
            currentClassifiers[i]['dash'] = 10;
            currentClassifiers[i]['fill'] = 'white';
            currentClassifiers[i]['picked'] = false;
            currentinputLines[i]['dash'] = 10;
            currentoutputLines[i]['dash'] = 10;
        }
        else {
            currentClassifiers[i]['dash'] = 0;
            currentClassifiers[i]['fill'] = 'skyblue'; 
            currentClassifiers[i]['picked'] = true;
            currentinputLines[i]['dash'] = 0;
            currentoutputLines[i]['dash'] = 0;
        }

        setinputLines(currentinputLines);
        setoutputLines(currentoutputLines);
        setClassifiers(currentClassifiers);
        console.log(currentClassifiers)
    }
    useEffect(() => {
        getFeatures();
    }, [classifiers])

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(updatedList.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        console.log(updatedList);
    };
    



    function onTrain() {
        setTraining(true)
        let finalClassifiers = [...classifiers];
        finalClassifiers = finalClassifiers.filter(classifier => classifier['picked'] === true)
        var models = []
        finalClassifiers.map((classifier,i) => (
            models[i] = {'name':classifier['name'], 'weight':classifier['w']}
            )
        )
        if(models.length>0){
            let data = { 'models': models, 'features': checked };
            axios.post(backend + '/train_new_model', data).then((response) => {
                setTraining(false)
            })
        }
      }


    return (
        <div style={floatContainer}>
        <div style={floatChild}>
            <h4 style={{ marginLeft: 20 }}>Create your classifier</h4>
            <p style={{marginLeft: 20}}>Double click to choose or remove the classifier</p>
            <div>
            <Stage
                width={700}
                height={500}
                style={stageStyle}
                >
                    <Layer>
                        {inputLines.map((line,i) => (
                            <Line
                                key={i}
                            points={[line['startingPoint'][0], line['startingPoint'][1], line['endingPoint'][0], line['endingPoint'][1]]}
                            stroke="#000000"
                            strokeWidth={2}
                                tension={0.5}
                                dash={[line['dash']]}
                                />
                            )
                        )}
                        {outputLines.map((line,i) => (
                            <Line
                                key={i}
                            points={[line['startingPoint'][0], line['startingPoint'][1], line['endingPoint'][0], line['endingPoint'][1]]}
                            stroke="#000000"
                            strokeWidth={2}
                                tension={0.5}
                                dash={[line['dash']]}
                                />
                            )
                        )}
                        {classifiers.map((classifier, i) => (
                            <Group key={i}>
                            <Rect
                                key={'rectangle_'+i}
                                x={classifier['x']}
                                y={classifier['y']}
                                width={100}
                                height={100}
                                stroke='black'
                                strokeWidth={3}
                                dash={[classifier['dash'], classifier['dash']]}
                                fill={classifier['fill']}
                                    onDblClick={() => onDoubleClick(i)}
                                /> 
                                <Text   key={'text_'+i} text={classifier['name']}
                                        x={classifier['x']+35}
                                        y={classifier['y']+35}
                                        fontSize={20}
                                />
                            </Group>
 
                        ))}
                        <Circle
                            x={350}
                            y={50}
                            radius={30}
                            fill='white'
                            stroke={'black'}
                        />
                        <Text   key={'text_input'} text={'Input'}
                            x={330}
                            y={40}
                            fontSize={20}
                        />
                        
                        <Circle
                            x={350}
                            y={450}
                            radius={40}
                            fill='white'
                            stroke={'black'}
                        />
                        <Text   key={'text_output'} text={'Output'}
                            x={322}
                            y={440}
                            fontSize={20}
                            />
                    </Layer>
            </Stage>
                </div>
                </div>
            {/* <div style={floatChild} className='col-2'>
                <h4>Choose your features</h4>
            {features.map((item, index) => (
            <div key={index}>
                    <input value={item} type="checkbox" style={{checked: index===0? 'True': 'False' }} onChange={handleCheck}/>
                <span style={{marginLeft: 10}}>{item}</span>
            </div>
            ))}
                <button onClick={() => onTrain()} style={{ margin:'auto',marginTop:'15px'}} className='btn btn-primary'>Train</button>
            </div> */}
            <div style={{ marginTop: '20px' }}>
            <h5>Features:</h5>
                    <div>
            {renderFeatures()}
                        </div>
                <h4>Chosen Classifiers</h4>
                <p>Pick a classifier to view details here</p>
                {classifiers.map((item, index) => (
                item['picked']?
                    <div>
                        <h4>{item.name}</h4>
                        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Current Weight</Form.Label>
                                    <Form.Control type="weight" value={item.w} onChange={(i) => changeWeight(item, i)} />

                            </Form.Group>
                        </Form>
                    </div>
                    :''
            ))}

                <button disabled={isTraining ? true : false} onClick={() => onTrain()} style={{ margin:'auto',marginTop:'15px'}} className='btn btn-primary'>Train</button>
            </div>

            </div>
    );
 
}
export default TrainingComponent;  


const stageStyle = {
    padding: '20',
    margin: '10px',
    boxShadow: '1px 2px 9px #F4AAB9',
}
  
const floatContainer ={
    padding: '20px', 
    display: 'flex'
}

const floatChild = {
    width: '50%',
    float: 'left',
    padding: '20px',
}  
const floatChildFeature = {
    width: '50%',
    float: 'left',
    flex: 1
}  