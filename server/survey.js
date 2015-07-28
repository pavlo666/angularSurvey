/* global require: true, process: true, console : true*/

(function (){
    "use strict";
    var express = require('express'),
        server,
        app = express(),
        usedPort = 8123;

    process.on('uncaughtException', function(err) {
        console.log("Error: " + err);
    });

    app.use(express.bodyParser());
    app.use('/', express.static('../client'));
    server = app.listen(usedPort);
    server.timeout = 0;
    console.log('Server running on ' + usedPort + '...');

})();

