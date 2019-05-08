module.exports.updateUser = (io, client, user, id) => {
    for (let [ key, value ] of client) {
        if (value === id) {
            io.to(key).emit('updatedUser', user);
        }
    }
};
