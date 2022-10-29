import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Classifier from './components/Cards/Classifier';
import ModelData from './components/Cards/ModelData';

function App() {
  return (
    <div className="app">
      <Navbar/>
      {/* <ModelData/> */}
  </div>
  );
}

export default App;
