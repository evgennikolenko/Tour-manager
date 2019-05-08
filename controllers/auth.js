const jwt = require('jsonwebtoken');
const User = require('./../models').User;
const Role = require('./../models').Role;
const Avatar = require('./../models').Avatar;
const RoleInCompany = require('./../models').RoleInCompany;
const Company = require('./../models').Company;
const Job = require('./../models').Job;
const UserRoleInTour = require('./../models').UserRoleInTour;


const passport = require('passport');

module.exports.checkToken = async(req, res, next) => {
    let token = req.headers[ 'x-access-token' ] || req.headers.authorization;

    if (token) {
        return res.send('Your is already auth');
    }
    next();
};

module.exports.login = async(req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            res.status(401).send({ message: info.message });
        } else {
            next();
        }
    })(req, res, next);
};

module.exports.register = async(req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
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

module.exports.jwtAuth = async(req, res) => {
    const userObj = req.body;

    req.logIn(userObj, (err) => {
        User.findOne({
            include: [ {
                model: Role,
                as: 'role',
                attributes: [ 'role' ]
            } ],
            where: {
                email: userObj.email
            }
        }).then((user) => {
            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role
                },
                'tour-manager', { expiresIn: 60 * 60 });

            res.status(200).send({
                auth: true,
                token: `Bearer ${token}`
            });
        });
    });
};

module.exports.getCurrentUser = async(req, res) => {
    const id = req.userId;

    try {
        let user = await User.findByPk(id,
            {
                include: [ 'role',
                    {
                        model: Avatar,
                        as: 'avatar',
                        attributes: [ 'name', 'type', 'path' ]
                    },
                    {
                        model: UserRoleInTour,
                        as: 'roleInTour',
                        attributes: [ 'id' ],
                        include: [
                            {
                                model: RoleInCompany,
                                as: 'roleInCompany',
                                include: [
                                    {
                                        model: Company,
                                        as: 'company',
                                        attributes: [ 'name', 'logo' ]
                                    },
                                    {
                                        model: Job,
                                        as: 'job',
                                        attributes: [ 'name' ]
                                    }
                                ]
                            } ]
                    } ]
            }
        );

        if(user) {
            console.log('2323232', user.role.role)
            if(user.role.role === 'employee') {
                const { id, firstname, lastname, gender, email, birth, createdAt, role, avatar,
                    roleInTour: { roleInCompany: { company, job } } } = user;

                user = {
                    id,
                    name: { firstname, lastname },
                    birth,
                    gender,
                    email,
                    role: role.role,
                    registrationDate: createdAt,
                    avatar,
                    company: company || null,
                    job: job || null
                };
            } else {
                const { id, firstname, lastname, gender, email, birth, createdAt, role, avatar } = user;

                user = {
                    id,
                    name: { firstname, lastname },
                    birth,
                    gender,
                    email,
                    role: role.role,
                    registrationDate: createdAt,
                    avatar,
                    company: null,
                    job: null
                };
            }

            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    }catch (e) {
        console.log(e);
    }
};

module.exports.getJobs = async(req, res) => {
    try {
        const jobs = await RoleInCompany.findAll({
            include: [
                {
                    model: Company,
                    as: 'company',
                    attributes: [ 'name', 'logo' ]
                },
                {
                    model: Job,
                    as: 'job',
                    attributes: [ 'name', 'id' ],
                    order: [ [ 'name', 'asc' ] ]
                }
            ],
            attributes: [ 'id' ]

        });

        if(jobs) {
            res.status(200).send(jobs);
        }
    } catch (e) {
        console.log(e);
    }
};

