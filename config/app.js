const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cron = require('node-cron');

const socketConfig = require('./socket-singletion');

const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');
const tourRouter = require('../routes/tour');
const staffRouter = require('../routes/staff');

const checkTourState = require('../utils/checkTourState');

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const app = express();

app.use(passport.initialize());

const server = require('http').createServer(app);

app.use(morgan('dev'));

require('./../middleware/passport').login(passport);
require('./../middleware/passport').register(passport);
require('./../middleware/passport').jwt(passport);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const jsonParser = bodyParser.json();

app.use(jsonParser);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use((urlencodedParser));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

socketConfig.SocketSingleton.configure(server);
require('./sockets');

app.use('/api/', authRouter);
app.use('/api/', userRouter);
app.use('/api/', tourRouter);
app.use('/api/', staffRouter);

cron.schedule('00 19 16 * * *', () => {
    checkTourState.checkState();
}, { timezone: 'Europe/Kiev' });




module.exports = server;
