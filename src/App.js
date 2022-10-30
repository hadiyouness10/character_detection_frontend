import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Classifier from './components/Cards/Classifier';
import ModelData from './components/Cards/ModelData';
import TrainingCard from './components/Cards/TrainingCard';

function App() {
  return (
    <div className="app">
      <Navbar/>
      <ModelData/>
      <TrainingCard/>
      <Classifier/>
  </div>
  );
}

export default App;
