import React, { Component } from 'react';
import './Navbar.css';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            algorithm:"Visualize!",
            feature:'None',
            maze:"Maze Algorithms",
            pathState:false,
            mazeState:false,
            speedState:"Fast"

        };
    }


    render() {

        return (<div>
            <div id="navbarDiv">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a href="#" className="navbar-brand" id="refreshBtn"> Letter Detection</a>
                </div>          
              </div>
            </nav>
          </div> 

   
      <div id='mainText'>
        <ul>
          <li>
            <div className="start start-node"></div>Train</li>
          <li>
            <div className="target finish-node"></div>Test</li>
        </ul>
      </div>
          </div>

        )

    }
}