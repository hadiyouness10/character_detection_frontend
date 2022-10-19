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

    selectAlgorithm(selection){
        //if algorithm is already running
        if(this.props.visualizingAlgorithm || this.props.generatingMaze){
            return;
        }
       if(this.props.visualizingAlgorithm){
            this.clearPath();
            this.setState({algorithm:selection});
        }else{
            this.setState({algorithm:selection});
        }
    }

    generateMaze(selection){
      if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
        return;
      }
      if(this.state.mazeState){
        this.clearGrid();
      }

      this.setState({maze:selection, mazeState:true})
      console.log(selection)
      if (selection === "Random Maze"){
        this.props.generateRandomMaze();
      }
      else if (selection === "Recursive Maze")
        this.props.generateRecursiveDivisionMaze();
      else if (selection === "Vertical Maze")
        this.props.generateVerticalMaze();
      else if (selection === "Horizontal Maze")
        this.props.generateHorizontalMaze();



      
    }

    selectFeature(selection){
      //if algorithm is already running
      if(this.props.visualizingAlgorithm || this.props.generatingMaze){
          return;
      }
      if (selection !== "Wall")
      {
        if(this.state.algorithm == "Visualize A*" || this.state.algorithm =="Visualize Bidirectional" || this.state.algorithm == "Visualize Dijkstra's" || this.state.algorithm === "Visualize BreadthFS"){
          this.setState({feature:selection});
          this.props.updateFeature(selection);

        }else{
        this.setState({feature:"None"});
        this.props.updateFeature("None");
        }
      }
      else {
        this.setState({ feature: selection });
        this.props.updateFeature(selection);
      }

  }

 

    visualizeAlgorithm(){
        //if algorithm is already running
        if(this.props.visualizeAlgorithm || this.props.generatingMaze){
            return;

      }
      this.clearPath();
        // if(this.state.pathState){
        //     this.clearTemp()
        // }
        if (this.state.algorithm === "Visualize!" ||this.state.algorithm === "Select an Algorithm!") {
            this.setState({ algorithm: "Select an Algorithm!" });
          } else {
              this.setState({pathState: true})
              if(this.state.algorithm == "Visualize Dijkstra's")
                  this.props.visualizeDijkstra();
            else if (this.state.algorithm === "Visualize A*")
                this.props.visualizeAStar();
            else if (this.state.algorithm === "Visualize BestFS")
                this.props.visualizeBestFirstSearch();
            else if (this.state.algorithm === "Visualize Bidirectional")
                this.props.visualizeBidirectionalSearch();
            else if (this.state.algorithm === "Visualize BreadthFS")
                this.props.visualizeBreadthFirstSearch();
            else if (this.state.algorithm === "Visualize DepthFS")
                this.props.visualizeDepthFirstSearch();
          }
    }

    clearGrid(){
      if(this.props.visualizeAlgorithm){
        return;
      }
      this.props.clearGrid();
      this.setState({
        algorithm:"Visualize!",
        pathState:false,
        mazeState:false,
      })
    }

    changeSpeed(speed){
      if(this.props.visualizeAlgorithm){
        return;
      }
      let value = [10,10];
      if(speed === "Slow") value = [50,30];
      else if(speed === "Average") value = [25,20];
      else if(speed === "Fast") value = [10,10];
      this.setState({speedState: speed});
      this.props.updateSpeed(value[0],value[1]);
    }

    clearPath(){
      if(this.props.visualizeAlgorithm){
        return;
      }
      this.props.clearPath();
      this.setState({
        pathState: false,
        mazeState: false,
      });
    }

    clearweightsANDwalls(){
      if(this.props.visualizeAlgorithm){
        return;
      }
      this.props.clearweightsANDwalls();
      this.setState({
        pathState: false,
        mazeState: false,
      });
    }


    render() {

        return (<div>
            <div id="navbarDiv">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a href="#" className="navbar-brand" id="refreshBtn"> PathFinding Visualizer</a>
                </div>
                <ul className="nav navbar-nav">
                  <li className="dropdown">
                    <a href="#" data-toggle="dropdown" className="dropdown-toggle">Algorithms<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li id="Dijkstra" onClick={() => this.selectAlgorithm("Visualize Dijkstra's")}><a href="#">Dijkstra's Algorithm</a></li>
                      <li id="BestFS" onClick={() => this.selectAlgorithm("Visualize BestFS")}><a href="#">Best First Search</a></li>
                      <li id="BreadthFS" onClick={() => this.selectAlgorithm("Visualize BreadthFS")}><a href="#">Breadth First Search</a></li>
                      <li id="DeapthFS" onClick={() => this.selectAlgorithm("Visualize DepthFS")} ><a href="#">Depth First Search</a></li>
                      <li id="Bidirectional" onClick={() => this.selectAlgorithm("Visualize Bidirectional")} ><a href="#">Bidirectional Search</a></li>
                      <li id="AStar" onClick={() => this.selectAlgorithm("Visualize A*")}><a href="#">A* Search</a></li>

                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" data-toggle="dropdown" className="dropdown-toggle">{this.state.maze}<span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li  onClick={() => this.generateMaze("Random Maze")}><a href="#">Random Maze</a></li>
                      <li  onClick={() => this.generateMaze("Horizontal Maze")}><a href="#">Horizontal Maze</a></li>
                      <li  onClick={() => this.generateMaze("Vertical Maze")}><a href="#">Vertical Maze</a></li>
                      <li  onClick={() => this.generateMaze("Recursive Maze")}><a href="#">Recursive Maze</a></li>

                    </ul>
                </li>
                <li className="dropdown">
                  <a href="#" id="addFeature" className="dropdown-toggle" data-toggle="dropdown">Feature: {this.state.feature} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li id="adjustWall" onClick={() =>this.selectFeature("None")}> <a href="#"> None</a></li>
                    <li id="adjustWall" onClick={() => this.selectFeature("Wall")}> <a href="#"> Wall</a></li>
                    <li id="adjustWeight"onClick={() => this.selectFeature("Weight")}> <a href="#"> Weight</a></li>
                  </ul>
                </li>

                <li id='startButtonStart'><button id="actualStartButton" className="btn btn-default navbar-btn" type="button" onClick={()=>this.visualizeAlgorithm()}>{this.state.algorithm}</button></li>
                <li id='startButtonClearBoard' onClick={() => this.clearGrid()}><a href="#">Clear Board</a></li>
                <li id='startButtonClearWalls' onClick={() => this.clearweightsANDwalls()}><a href="#">Clear Walls &amp; Weights</a></li>
                <li id='startButtonClearPath' onClick={()=>this.clearPath()}><a href="#">Clear Path</a></li>
                <li className="dropdown">
                  <a href="#" id="adjustSpeed" className="dropdown-toggle" data-toggle="dropdown">Speed : {this.state.speedState} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li id="adjustFast" onClick={() => this.changeSpeed("Fast")}> <a href="#"> Fast</a></li>
                    <li id="adjustAverage" onClick={() => this.changeSpeed("Average")}> <a href="#"> Average</a></li>
                    <li id="adjustSlow" onClick={() => this.changeSpeed("Slow")}> <a href="#"> Slow</a></li>
                  </ul>
                </li>
                </ul>
              </div>
            </nav>
          </div> 

   
      <div id='mainText'>
        <ul>
          <li>
            <div className="start start-node"></div>Start Node</li>
          <li>
            <div className="target finish-node"></div>Target Node</li>
         <li>
            <div className="unvisited"></div>Unvisited Node</li>
          <li>
            <div className="visited"></div>Visited Nodes</li>
          <li>
            <div className="shortest-path"></div>Shortest-path Node</li>
            <li>
            <div className="node-weight"></div>Weight</li>
            <li>
            <div className="node-wall"></div>Wall</li>
        </ul>
      </div>
          </div>

        )

    }
}