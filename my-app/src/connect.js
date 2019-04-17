import TinkaCore from './tinkacore.js';

let tinkaServiceName = 0xfffa;
const slider = document.getElementById('slider');

// Place to hold tinkacores and information about them
let tinkacores = {}; // Dict containing all tinkacores
TinkaCore.core_ids = TinkaCore.core_ids || {
    connected: new Set([]),
    disconnected: new Set([])
}

function connect(){
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
            device.addEventListener('gattserverdisconnected', onDisconnected);

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
            add_tinkacore(newDeviceID, characteristics);
        })
        .catch(error => {
            console.log("ERROR: " + error);
        });
}

function add_tinkacore(id, characteristics) {
    if (TinkaCore.core_ids.disconnected.has(id)) {
        tinkacores[id].reconnect(characteristics);
    }
    else {
        let newTinkaCore = new TinkaCore(id, characteristics);
        newTinkaCore.connect();
        tinkacores[id] = new TinkaCore(id, characteristics);
    }

    console.log(tinkacores);
    console.log(TinkaCore.core_ids);
    return tinkacores;
}

function onDisconnected(event) {
    let device = event.target;
    let disconnected_id = device.id;

    tinkacores[disconnected_id].disconnect();
    console.log(TinkaCore.core_ids);
    console.log('Device ' + device.name + ' is disconnected.');
}


module.exports = {
    connect,
    add_tinkacore,
    onDisconnected
}