const socketConfig = require('./socket-singletion');
const staffSocket = require('./../middleware/sockets/staff-sockets');
const userSocket = require('./../middleware/sockets/user-sockets');
const jwt = require('jsonwebtoken');

let clients = new Map();

socketConfig.SocketSingleton.io.on('connection', (socket) => {

    socket.on('CONNECT', (bearerToken) => {
        let token;

        if (bearerToken) {
            if (bearerToken.startsWith('Bearer ')) {
                token = bearerToken.slice(7, bearerToken.length);
            }
        }
        jwt.verify(token, 'tour-manager', function(err, decoded) {
            if (err) {

                io.emit('CONNECTED', { error: err.message });
            } else {
                clients.set(socket.id, decoded.userId);
                io.emit('CONNECTED', { userId: decoded.userId, role: decoded.role });
            }
        });
        console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', clients.size);
    });

    socket.on('sendInvitations', (item) => staffSocket.sendInvitation(io, clients, item));

    socket.on('updateUser', (user, id) => userSocket.updateUser(io, clients, user, id));

    socket.on('disconnect', () => clients.delete(socket.id));
});
