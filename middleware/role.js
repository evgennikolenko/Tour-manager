const passport = require('passport');

module.exports.getRole = async(req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            res.status(401).send(info.message);
        } else {
            next();
        }
    })(req, res, next);
};
