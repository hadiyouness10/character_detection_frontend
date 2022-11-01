import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import ModelData from './components/Cards/ModelData';
import TrainingCard from './components/Cards/TrainingCard';
import Classifiers from './components/Classifiers/Classifiers'
import Methods from './components/Methods/Methods';

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Classifiers/>
      <Methods/>
  </div>
  );
}

export default App;