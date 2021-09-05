#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./server');
var debug = require('debug')('expressapp:server');
var http = require('http');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    emptyRoomUsers
} = require('./utils/users');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
const socketio = require('socket.io');
var io = socketio(server);

io.on('connection',(socket)=>{
    console.log('socket is ready for connection');
    socket.on('joinRoom', ({ ...roomObject }) => {
        const user = userJoin(socket.id, roomObject.user.name, roomObject.room_uuid,roomObject.user.user_uuid);
        socket.join(user.room);
        socket.emit('message', 'Welcome to Fitwos '+user.username);
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
               `${user.username} has joined the call`
            );
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
        io.to(user.room).emit('roomSettings', {
            ...roomObject
        });

    })

    // Listen for messages
    socket.on('chatMessage', msg => {
        console.log('chat message trigger');
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', msg);
    });
    var countdown;
    let value;
    socket.on('start_timer',({ ...roomObject })=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('timer', {message:`${user.username} has started the timer`,room:user.room});
    })
    socket.on('pause_timer',({...roomObject})=>{
        console.log('show socket',socket.id)
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('timer', {message:`${user.username} has paused the timer`,room:user.room});
    })
    socket.on('end_timer',({...roomObject})=>{
        console.log('show socket',socket.id)
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('timer', {message:`${user.username} has ended the timer`,room:user.room});
    })
    socket.on('disconnect', (msg) => {
        console.log('disconnect triggered',socket.id)
        const user = userLeave(socket.id);
        console.log('show user',user)
        if (user) {
            io.to(user.room).emit(
                'message',
                {username:user.username,message:'User has left call',room:user.room}
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

    socket.on('endRoom',msg=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit(
            'message',
            {username:user.username,message:'User has ended room',room:user.room}
        );
        userLeave(socket.id);
        io.socketsLeave(user.room);



    })

})
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, '0.0.0.0', async () => {
    // eslint-disable-next-line no-console
    console.log(`Service started on port ${port}`);
    debug('http server start');
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
