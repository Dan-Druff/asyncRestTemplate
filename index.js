
var server = require('./lib/server');

var asyncTemplate = {};

asyncTemplate.init = () => {
    console.log("Initializing SERVER");
    server.init();
}

asyncTemplate.init();
