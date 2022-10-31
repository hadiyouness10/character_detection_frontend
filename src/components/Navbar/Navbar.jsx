import React, { Component } from 'react';
import './Navbar.css';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          trainStatus:false,
          testStatus:false,

        };
    }

    Test(){
      this.setState({
        testStatus:true,
      })
    }

    Train(){
      this.setState({
        testStatus:true,
      })
    }


    render() {

        return (
            <div id="navbarDiv">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a href="#" className="navbar-brand" id="refreshBtn"> Letter Detection</a>
                </div>
                <ul className="nav navbar-nav"> 
                <li id='TestData' onClick={() => this.Test()}><a href="#">Test</a></li>
                <li id='TrainData' onClick={() => this.Train()}><a href="#">Train</a></li>
                </ul>

              </div>
            </nav>
          </div> 
          

        )

    }
}