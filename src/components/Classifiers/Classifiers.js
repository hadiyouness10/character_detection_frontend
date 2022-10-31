import React, { Component } from 'react';
import {backend} from "../../config"

class Classifiers extends Component {
 componentDidMount() {
 // Runs after the first render() lifecycle
 console.log("Did mount called");
 fetch(`${backend}/info`).then((result) => {
    if (result.ok) {
        result.json().then((body) => {
            console.log(body);
        });
    }
});
}

render() {
 console.log('Render lifecycle')
 return <h1>Hello World!</h1>;
 }
}
export default Classifiers;  