import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import ModelData from './components/Cards/ModelData';
import TrainingCard from './components/Cards/TrainingCard';
import Classifiers from './components/Classifiers/Classifiers'
import TrainingComponent from './components/TrainingComponent/TrainingComponent';

function App() {
  return (
    <div className="app">
      <Navbar/>
      {/* <Classifiers/> */}
      <TrainingComponent/>
  </div>
  );
}

export default App;
