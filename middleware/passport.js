const uid = require('node-uid');
const bcrypt = require('bcryptjs');
const UserRoleInTour = require('./../models').UserRoleInTour;
const LocalStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../models').User;
const Role = require('./../models').Role;

const BCRYPT_SALT_ROUNDS = 12;

module.exports.login = (passport) => {
    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                session: false
            },
            (email, password, done) => {
                try {
                    User.findOne({ where: { email } })
                        .then((user) => {
                            if (user === null) {
                                return done(null, false, { message: 'User not found!' });
                            }
                            bcrypt.compare(password, user.password).then((response) => {
                                if (response !== true) {
                                    return done(null, false, { message: 'Passwords do not match' });
                                }
                                return done(null, user);
                            });
                        });
                } catch (err) {
                    done(err);
                }
            }
        )
    );
};

module.exports.register = (passport) =>
{
    passport.use(
        'register',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
                session: false
            },
            (req, email, password, done) => {
                const { firstname, lastname, birth, gender, role, status, roleInCompanyId } = req.body;

                try {
                    User.findOne({ where: { email } }).then((user) => {
                        if (user != null) {
                            return done(null, false, { message: 'Email already taken' });
                        }
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
                            User.create(
                                {   email,
                                    password: hashedPassword,
                                    firstname,
                                    lastname,
                                    birth,
                                    gender,
                                    status })
                                .then((user) => {
                                    Role.create({ userId: user.id, role }).then(() => {
                                        if(role === 'employee') {
                                            UserRoleInTour.create({ userId: user.id, roleInCompanyId }).then(() => {
                                                done(null, user);
                                            });
                                        } else {
                                            done(null, user);
                                        }
                                    });

                                })
                                .catch((err) => done(null, false, { message: err.message }));
                        });
                    });
                } catch (err) {
                    done(err);
                }
            },
        ),
    );
};

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tour-manager'
};

module.exports.jwt = (passport) => {
    passport.use(
        'jwt',
        new JWTstrategy(opts, (jwtPayload, done) => {
            try {
                User.findOne({
                    where: {
                        id: jwtPayload.userId
                    }
                }).then((user) => {
                    if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                });
            } catch (err) {
                done(err);
            }
        }),
    );
};

