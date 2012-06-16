var io = require('socket.io').listen(8080);

var clients = {};

io.sockets.on('connection', function (socket) {
	clients[socket.id] = socket;
  socket.on('solved', function (data) {
  	console.log('received solved from ' + socket.id);
    for(var key in clients) {
    	if (key === socket.id) continue;

    	console.log('send to opponent');
    	clients[key].emit('generateShape');
    }
  });

  socket.on('disconnect', function () {
    delete clients[socket.id];
  });


});

