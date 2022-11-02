import React, { Component } from 'react';
import './Navbar.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Predict from '../../pages/Predict';
import Train from '../../pages/Train';

export default  function Navbar(props) {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       trainStatus:false,
    //       testStatus:false,

    //     };
    // }

    const navigate = useNavigate();

    const navigatePredict = () => {
      // 👇️ navigate to /contacts
      navigate('/predict');
    };
  
    const navigateTrain = () => {
      // 👇️ navigate to /
      navigate('/train_new_model')
    };

        return (
          <div>
            <div id="navbarDiv">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a href="#" className="navbar-brand" id="refreshBtn"> Letter Detection</a>
                </div>
                <ul className="nav navbar-nav"> 
                <li id='TestData' onClick={navigatePredict}><a href="#">Predict</a></li>
                <li id='TrainData' onClick={navigateTrain}><a href="#">Train</a></li>
                </ul>



              </div>
            </nav>
          </div> 


        <Routes>
        <Route path="/train_new_model" element={<Train/>} />
        <Route path="/predict" element={<Predict/>} />
        <Route path="/" element={<Predict/>} />
        </Routes>

        </div>
          

        );
}