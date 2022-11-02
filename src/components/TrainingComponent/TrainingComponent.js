import React, { Component , useEffect, useState} from 'react';

import {backend} from "../../config"
// import Classifier from '../Classifier/Classifier';
import axios from 'axios';
import { Stage, Layer, Line, Rect, Circle, Group, Text } from 'react-konva';

function TrainingComponent(props) {

    const [models, setModels] = useState([]);
    const [checked, setChecked] = useState([]);
    const [features, setFeatures] = useState(['pixels_per_segment', 'horizontal_histogram', 'vertical_histogram'])


    function getFeatures() {
        axios.get(backend + '/features').then((response) => {
            setFeatures(response.data.features);
    })
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
            name: 'knn'
        },
        {
            x: 300,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'svm'
        },
        {
            x: 500,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'dt'
        }
    ]);
    function onDoubleClick(i) {
        console.log('double clicked' + i)
        let currentClassifiers = classifiers.concat([]);
        let currentinputLines = inputLines.concat([]);
        let currentoutputLines = outputLines.concat([]);
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
        console.log('rerendering')
    }, [classifiers])

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        console.log(updatedList);
      };
    function onTrain() {
        let finalClassifiers = [...classifiers];
        finalClassifiers = finalClassifiers.filter(classifier => classifier['picked'] === true)
        var models = []
        finalClassifiers.map((classifier,i) => (
            models[i] = {'name':classifier['name'], 'weight':1}
            )
        )
        console.log(checked);
        console.log(models)
        let data = {'models': models, 'features':checked}
        axios.post(backend + '/train_new_model', data).then((response) => {
            console.log(response);
        })
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
                                onDblClick={()=>onDoubleClick(i)}
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
            <div style={floatChild} className='col-2'>
                <h4>Choose your features</h4>
            {features.map((item, index) => (
            <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck}/>
                <span style={{marginLeft: 10}}>{item}</span>
            </div>
            ))}
                <button onClick={() => onTrain()} style={{ margin:'auto',marginTop:'15px'}} className='btn btn-primary'>Train</button>
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
    padding: '20px'
}

const floatChild = {
    width: '50%',
    float: 'left',
    padding: '20px',
}  