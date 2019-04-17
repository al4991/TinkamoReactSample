import React, { Component } from 'react';
import './App.css';
import TinkaCore from "./tinkacore";
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
            tinkacores: {}
        }
    }
    connect(){
        console.log('Requesting Bluetooth Device...');
        let newDeviceID; // Hold on to the device ID for later
        navigator.bluetooth.requestDevice({
            filters : [{
                name: 'Tinka',
            }],
            optionalServices: [tinkaServiceName]
        })
            .then(device => {
                console.log('> Found ' + device.name);
                console.log('> Id: ' + device.id);
                console.log('> Connected: ' + device.gatt.connected);
                device.addEventListener('gattserverdisconnected', this.onDisconnected);
                //might have to bind thins

                newDeviceID = device.id;
                return device.gatt.connect()
            })
            .then(server => {
                console.log(server);
                return server.getPrimaryService(tinkaServiceName);
            })
            .then(service => {
                console.log('Tinka services...');
                console.log(service);
                return service.getCharacteristics();
            })
            .then(characteristics => {
                console.log('Tinka characteristics...');
                this.add_tinkacore(newDeviceID, characteristics);
            })
            .catch(error => {
                console.log("ERROR: " + error);
            });
    }

    add_tinkacore(id, characteristics) {
        if (TinkaCore.core_ids.disconnected.has(id)) {
            this.state.tinkacores[id].reconnect(characteristics);
        }
        else {
            let newTinkaCore = new TinkaCore(id, characteristics);
            newTinkaCore.connect();
            this.state.tinkacores[id] = new TinkaCore(id, characteristics);
        }

        console.log(this.state.tinkacores);
        console.log(TinkaCore.core_ids);
        return this.state.tinkacores;
    }

    onDisconnected(event) {
        let device = event.target;
        let disconnected_id = device.id;

        this.state.tinkacores[disconnected_id].disconnect();
        console.log(TinkaCore.core_ids);
        console.log('Device ' + device.name + ' is disconnected.');
    }


    render() {
    return (
      <div className="App">
          <h1> Bluetooth </h1>
          <button onclick={this.connect().bind(this)}>
              Connect
          </button>
      </div>
    );
  }
}

export default App;
