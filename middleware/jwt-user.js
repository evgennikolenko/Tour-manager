const passport = require('passport');

module.exports.getUser = async(req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            res.status(401).send(info.message);
        } else {
            req.userId = user.id;
            next();
        }
    })(req, res, next);
};
