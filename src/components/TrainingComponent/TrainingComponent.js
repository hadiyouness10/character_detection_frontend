import React, { Component , useEffect, useState} from 'react';

import {backend} from "../../config"
// import Classifier from '../Classifier/Classifier';
import axios from 'axios';
import { Stage, Layer, Line, Rect, Circle, Group, Text } from 'react-konva';
import { Form, Button, Dropdown} from 'react-bootstrap';

function TrainingComponent(props) {

    const [models, setModels] = useState([]);

    const [checked, setChecked] = useState([]);
    const [english, setEnglish] = useState(false);
    const [arabic, setArabic] = useState(false);
    const [isTraining, setTraining] = useState(false);
    const [showForm, setShowForm] = useState({});
    const [activationFunctions, setActivationFunctions] = useState({});

    const [features, setFeatures] = useState(['pixels_per_segment', 'horizontal_histogram', 'vertical_histogram'])


    function getFeatures() {
        axios.get(backend + '/features').then((response) => {
            setFeatures(response.data.features);
    })
    }

    function changeWeight(item, target) {
        let currentClassifiers = [...classifiers];
        for (var i = 0; i < currentClassifiers.length; i++){
            if (currentClassifiers[i] === item) {
                currentClassifiers[i]['w'] = target.target.value;
            }
        }
        setClassifiers(currentClassifiers);
    }


    function handleAddLayer(item) {
        console.log(activationFunctions)
        let currentClassifiers = [...classifiers];
        for (var i = 0; i < currentClassifiers.length; i++){
            if (currentClassifiers[i] === item) {
                currentClassifiers[i]['layers'].push(currentClassifiers[i]['layers'].length >0 ? parseInt(currentClassifiers[i]['layers'].slice(-1))+1: 0);
            }
        }

        let key = item['name'];
        let value = true

        setShowForm({
            ...showForm,
            [key]: value,
        });
        };

    const handleActivationChange = (item,index, activation) => {
        let currentClassifiers = [...classifiers];
        for (var i = 0; i < currentClassifiers.length; i++){
            if (currentClassifiers[i] === item) {
                currentClassifiers[i]['activation_functions'].splice(index, 1, activation);
                let key = item['name'];
                let keyinner = index
                let value = activation
                if(Object.keys(activationFunctions).length === 0){
                    setActivationFunctions({
                        [key]: {
                            ...activationFunctions[key],
                            [keyinner]:value
    
                        },
                    })
                }else{
                setActivationFunctions({
                    ...activationFunctions,
                    [key]: {
                        ...activationFunctions[key],
                        [keyinner]:value

                    },
                })
            }
            }
        }
        };


    const [inputLines, setinputLines] = useState([
        {
            startingPoint: [350, 50],
            endingPoint: [70, 200],
            dash: 10
        },
        {
            startingPoint: [350, 50],
            endingPoint: [210, 200],
            dash: 10
        },
        {
            startingPoint: [350, 50],
            endingPoint: [350, 200],
            dash: 10

        },
        {
            startingPoint: [350, 50],
            endingPoint: [490, 200],
            dash: 10

        }, 
        {
            startingPoint: [350, 50],
            endingPoint: [640, 200],
            dash: 10

        }]);
    
        const [outputLines, setoutputLines] = useState([
        {
            startingPoint: [350, 450],
            endingPoint: [60, 300],
            dash: 10

        },
        {
            startingPoint: [350, 450],
            endingPoint: [210, 300],
            dash: 10

        },
        {
            startingPoint: [350, 450],
            endingPoint: [350, 300],
            dash: 10

        },
        {
            startingPoint: [350, 450],
            endingPoint: [500, 300],
            dash: 10

        },
        {
            startingPoint: [350, 450],
            endingPoint: [640, 300],
            dash: 10

        }
    ]);
    const [classifiers, setClassifiers] = useState([
        {
            x: 20,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false,
            name: 'knn',
            w: 1,
            features: [],
        },
        {
            x: 160,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'svm', 
            w: 1,
            features: []
        },
        {
            x: 300,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'dt', 
            w: 1, 
            features: []
        },
        {
            x: 440,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'cnn', 
            w: 1, 
            features: [],
            layers: [],
            activation_functions: [],
        },
        {
            x: 580,
            y: 200,
            dash: 10,
            fill: 'white',
            picked: false, 
            name: 'ann', 
            w: 1, 
            features: [],
            layers: [],
            activation_functions: [],

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

    const renderLayers = (item) => {
        let currentClassifiers = [...classifiers];
        var layers = []
        let name = item['name']
        for (var i = 0; i < currentClassifiers.length; i++){
            if (currentClassifiers[i] === item) {
                layers = currentClassifiers[i]['layers'];

            }
        }
        var rendered_layers = []
        for (let i = 0; i < layers.length; i++) {
        rendered_layers.push(
        <Form.Group key={i}>
        <Form.Label style={{
        marginBottom:'5px',
        textAlign: "left",
        fontWeight: "bold"
        }}>Layer {i + 1}</Form.Label>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic"
        style={{
            width: "100%",
            textAlign: "left",
            fontWeight: "bold",
            marginBottom:'5px',
            }}>
        {(activationFunctions[name] && activationFunctions[name][i]) || "Choose Activation Function"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item style={{ fontWeight: "bold", display: "block" }}
        onClick={() => handleActivationChange(item,i, "relu")}
        >
        ReLU
        </Dropdown.Item>
        <Dropdown.Item style={{ fontWeight: "bold", display: "block" }}
        onClick={() => handleActivationChange(item,i, "sigmoid")}
        >
        Sigmoid
        </Dropdown.Item>
        <Dropdown.Item style={{ fontWeight: "bold", display: "block" }}
        onClick={() => handleActivationChange(item,i, "tanh")}
        >
        Tanh
        </Dropdown.Item>
        <Dropdown.Item style={{ fontWeight: "bold", display: "block" }}
        onClick={() => handleActivationChange(item,i, "softmax")}
        >
        Softmax
        </Dropdown.Item>
        <Dropdown.Item style={{ fontWeight: "bold", display: "block" }}
        onClick={() => handleActivationChange(item,i, "linear")}
        >
        Linear
        </Dropdown.Item>
        <Dropdown.Item style={{ fontWeight: "bold", display: "block" }}
        onClick={() => handleActivationChange(item,i, "exponential")}
        >
        Exponential
        </Dropdown.Item>
        </Dropdown.Menu>

        </Dropdown>
        </Form.Group>
        );
        }
        return rendered_layers;
        };

    function onDoubleClick(i) {
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

            (classifier['name']==="ann" || classifier['name']==="cnn" )?
            models[i] = {'name':classifier['name'], 'weight':classifier['w'],'activation_functions':classifier['activation_functions']}:
            models[i] = {'name':classifier['name'], 'weight':classifier['w']}
            
            )
        )
        if(models.length>0){
            let data = { 'models': models, 'features': checked, 'english': english, 'arabic': arabic };
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
            <div style={{ marginTop: '20px' }}>
            <h5>Features:</h5>
                    <div>
            {renderFeatures()}
                        </div>
                <h4>Chosen Classifiers</h4>
                <div>
                <p>Pick a classifier to view details here</p>
                <input onClick={()=>setEnglish(!english)} id='english' name='English' style={{}} type={'checkbox'}/>
                <label style={{marginLeft: 10}} for="English">English</label><br/>
                <input onClick={()=>setArabic(!arabic)} id='arabic' name='Arabi' style={{}} type={'checkbox'}/>
                <label style={{marginLeft: 10}} for="English">Arabic</label><br/>
                </div>
                {classifiers.map((item, index) => (
                item['picked']?
                    <div>
                        <h4>{item.name}</h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Current Weight</Form.Label>
                                <Form.Control type="weight" value={item.w} onChange={(i) => changeWeight(item, i)} />
                            </Form.Group>
                            {(item['name'] === "ann" || item['name'] === 'cnn')?
                                <div>
                                {showForm[item.name] && renderLayers(item)}
                                        <Button onClick={() => handleAddLayer(item)}>Add Layer</Button>
                                </div> 
                                
                                :''}
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