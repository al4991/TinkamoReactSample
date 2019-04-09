import React, { Component } from 'react';
import './App.css';
import mynamejeff  from './test.js';
//Dictionary of tinkacore ids
//Each instance added to dictionary will have
//Specific characteristics
//Want to print out and these connections
//Have a list of text
//Updated in real time if connected
//Similar to to do list in tutorials
//Print values of sensors


class App extends Component {

    render() {
    var x = mynamejeff();
    return (
      <div className="App">
          <h1> {x}</h1>
      </div>
    );
  }
}

export default App;
