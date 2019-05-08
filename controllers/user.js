const User = require('./../models').User;
const Avatar = require('./../models').Avatar;
const Role = require('./../models').Role;
const RoleInCompany = require('./../models').RoleInCompany;
const Company = require('./../models').Company;
const Job = require('./../models').Job;
const UserRoleInTour = require('./../models').UserRoleInTour;
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

module.exports.getUser = async(req, res) => {
    const userId = req.params.id;

    try {
        let user = await User.findByPk(userId, {
            include: [ 'role',
                {
                    model: Avatar,
                    as: 'avatar',
                    attributes: [ 'name', 'type', 'path' ]
                } ]
        });

        if(user) {
            const { firstname, lastname, gender, email, birth, status, createdAt, role, avatar } = user;

            user = {
                name: { firstname, lastname },
                birth,
                gender,
                email,
                status,
                role: role.role,
                registrationDate: createdAt,
                avatar
            };
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    }catch (e) {
        console.log(e);
    }
};

module.exports.updateUser = async(req, res) => {
    const id = req.userId;
    const data = req.body;

    const passControl = data.oldPassword;

    const { firstname, lastname, email, password } = data;

    try {
        const user = await User.findByPk(id, {
            include: [ 'role',
                {
                    model: Avatar,
                    as: 'avatar',
                    attributes: [ 'name', 'type', 'path' ]
                } ]
        });

        if(!user) {
            res.status(404).send({ message: 'User not found' });
        } else if(!data.oldPassword && !data.newPassword) {

                let updateUser = await user.update({ firstname, lastname, email });

                if(updateUser) {
                    const { id, firstname, lastname, gender, email, birth, status, createdAt, avatar, role } = user;


                    updateUser = {
                        id,
                        name: { firstname, lastname },
                        birth,
                        gender,
                        email,
                        status,
                        role: role.role,
                        registrationDate: createdAt,
                        avatar
                    };
                    res.status(200).send(updateUser);
                } else {
                    res.status(400).send({ message: 'User cannot be updated' });
                }
            } else {
                bcrypt.compare(passControl, user.password).then(async(response) => {
                    if (response !== true) {
                        res.status(401).send({ message: 'Old password not valid' });
                    } else {
                        bcrypt.hash(data.newPassword, BCRYPT_SALT_ROUNDS).then(async(hashedPassword) => {
                            let updateUser = await user.update({ firstname, lastname, email, password: hashedPassword });

                            if(updateUser) {
                                const { id, firstname, lastname, gender, email, birth, status, createdAt, avatar, role } = user;

                                updateUser = {
                                    id,
                                    name: { firstname, lastname },
                                    birth,
                                    gender,
                                    email,
                                    status,
                                    role: role.role,
                                    registrationDate: createdAt,
                                    avatar
                                };
                                res.status(200).send(updateUser);
                            } else {
                                res.status(400).send({ message: 'User cannot be updated' });
                            }
                        })
                    }
                });
            }
    }catch (e) {
        console.log(e);
    }
};

module.exports.deleteUser = async(req, res) => {
    const userId = req.params.id;

    const deleteStatus = await User.destroy({
        where: { id: userId }
    });

    if(deleteStatus) {
        res.status(200).send({ message: 'User was deleted' });
    } else {
        res.status(404).send({ message: 'User not found' });
    }
};

module.exports.getEmployees = async(req, res) => {

    try{
        let employees = await User.findAll({
            include: [ {
                model: Role,
                as: 'role',
                where: { role: 'employee' },
                attributes: [ 'role' ]
            }, {
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
                }]
        });

        if(employees) {
            employees.forEach((element, index) => {
                if(element.role.role === 'employee') {
                    const { id, firstname, lastname, gender, email, birth, createdAt, role, avatar,
                        roleInTour: { roleInCompany: { company, job } } } = element;

                    const item = {
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

                    employees[ index ] = item;

                } else {
                    const { id, firstname, lastname, gender, email, birth, createdAt, role, avatar } = element;

                    const item = {
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

                    employees[ index ] = item;
                }

            });


            res.status(200).send(employees);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    }catch (e) {
        console.log(e);
    }
};

module.exports.uploadAvatar = async(req, res) => {
    const userId = req.params.id;

    const image = {};

    image.url = req.file.url;
    image.name = req.file.public_id;
    image.type = req.file.mimetype;

    let user = await User.findByPk(userId);

    const is = await user.getAvatar();

    if(is) {
        Avatar.update({
            name: image.name,
            type: image.type,
            path: image.url,
            userId
        }, { where: { userId } }).then(() => {
            res.status(201).send({
                name: image.name,
                type: image.type,
                path: image.url
            });
        });
    } else {
        user.createAvatar({
            name: image.name,
            type: image.type,
            path: image.url,
            userId
        }).then(() => {
            res.status(201).send({
                name: image.name,
                type: image.type,
                path: image.url
            });
        });
    }
};
