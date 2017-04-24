var http = require('http');
var cluster = require('cluster');
var os = require('os');

var debug = false;

if (!cluster.isMaster) {
    console.log('The cluster is running.');
    require('total.js');

    // Set framework ID
    F.on('message', function(message) {
        if (message.type === 'id')
            F.id = message.id;
        }
    );

    F.http('release', {debug: debug});
} else {
    function forker(id) {
        // Run framework
        var fork = cluster.fork();
        fork.id = id
        fork.on('message', onMessage);
        // Send ID
        //  keeping id same so that you can have a single service model
        //if (F.id === 0) {
        //service perhaps sets a flag to db?
        //}else{
        // execution
        //}
        fork.send({type: 'id', id: id});

    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
        forker(worker.id);
    });

    var numCPUs = os.cpus().length;

    for (var i = 0; i < numCPUs; i++) {
        forker(i)
    }
}

function onMessage(message) {
    console.log('Message ->', message);
}

// Use a terminal for testing:
// $ siege -b -r 10 http://127.0.0.1:8000/
