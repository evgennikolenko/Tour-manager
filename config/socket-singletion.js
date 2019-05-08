const socket = require('socket.io');
const redis = require('redis');

// const pub = redis.createClient('9000', 'localhost');
// const sub = redis.createClient('9000', 'localhost');
// const client = redis.createClient('9000', 'localhost');

module.exports.SocketSingleton = (function() {
    this.io = null;
    this.configure = function(server) {
        this.io = socket(server);
        // this.io.set('store', new RedisStore({
        //     redisPub: pub,
        //     redisSub : sub,
        //     redisClient : client
        // }));
    };

    return this;
})();

