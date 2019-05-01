import React, { Component } from 'react';
import './App.css';
import Tinkamo from "./tinkamo";
let tinkaServiceName = 0xfffa;

//Dictionary of tinkacore ids
//Each instance added to dictionary will have
//Specific characteristics
//Want to print out and these connections
//Have a list of text
//Updated in real time if connected
//Similar to to do list in tutorials
//Print values of sensors

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tinkamo: new Tinkamo()
        }
    }


    render() {
        return (
          <div className="App">
              <h1> Bluetooth </h1>
              Hello
          </div>
        );
    }
}

export default App;
