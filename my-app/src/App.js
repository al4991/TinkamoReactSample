import React, { Component } from 'react';
import './App.css';

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
            tinkamo: this.props.tinkamo,
            tinka0: undefined,
            connectionButton: document.getElementById('connectionButton')

        }
    }

    onConnectionCallback() {
        this.state.tinkamo.connect((tinkacore) => {
            // Set up event listeners used as examples.
            if (tinkacore.name === 'tinka0') {
                this.setState({tinka0: tinkacore});
            }
            // this.state.connectionButton.className = "waves-effect waves-light btn-large blue darken-1"
            // this.state.connectionButton.innerHTML = "<i class='material-icons left'>bluetooth_connected</i>Connect another one!"
        }, this.state.connectionButton);
    }

    parseCores() {
        let x = ``;
        for (const i in this.state.tinkamo.tinkacores) {
            x += <div>{i}</div>
        }
        return x;
    }
    render() {
        return (
          <div className="App">
              <a className="waves-effect waves-light btn-large red darken-1" id="connectionButton"
                 onClick={this.onConnectionCallback.bind(this)}><i className="material-icons left">bluetooth</i>Connect your Tinkamo!</a>
              {this.parseCores()}
          </div>
        );
    }
}
//
// function BluetoothButton(props) {
//     return <h1> </h1>
// }


export default App;
