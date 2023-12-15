var ks = require('node-key-sender');

function controlS(){
    ks.sendCombination(['control', 's']);
}

var interval = setInterval(controlS, 15000);
