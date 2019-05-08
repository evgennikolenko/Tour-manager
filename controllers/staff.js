const Tour = require('./../models').Tour;
const Place = require('./../models').Place;
const Staff = require('./../models').Staff;
const User = require('./../models').User;

const mailer = require('./../utils/sendMailer');

module.exports.getInvitations = async(req, res) => {
    const userId = req.userId;

    try {
        const invetationTours = await Tour.findAll({
            include: [
                {
                    model: Place,
                    as: 'places',
                    through: { attributes: [] },
                    attributes: [ 'country', 'state', 'city' ]
                },
                {
                    model: User,
                    as: 'staff',
                    where: { id: userId },
                    through: { where: { invitationStatus: 'pending' }, attributes: [ 'invitationStatus', 'payment' ], as: 'info' },
                    attributes: [ 'id', 'firstname', 'firstname', 'email' ]
                } ],
            where: { state: 'planned' },
            attributes: [ 'id', 'startDate', 'endDate', 'name', 'description', 'state' ]
        });

        if(invetationTours) {
            res.status(200).send(invetationTours);
        } else {
            res.status(404).send({ message: 'Tours weren`t founded' });
        }

    } catch (e) {
        console.warn(e);
    }
};

module.exports.getTour = async(req, res) => {
    const tourId = req.params.id;
    const userId = req.userId;

    try {
        let tour = await Tour.findOne({
            include: [ {
                model: Place,
                as: 'places',
                through: { attributes: [] },
                attributes: [ 'country', 'state', 'city' ]
            },
            {
                model: User,
                as: 'staff',
                through: { attributes: [ 'invitationStatus', 'payment' ], as: 'info' },
                attributes: [ 'id', 'firstname', 'firstname', 'email' ]
            } ],
            where: { id: tourId }
        });

        if(tour && tour.staff.find((e) => e.id === userId)) {
            tour = JSON.parse(JSON.stringify(tour));
            tour = {
                ...tour,
                earnMoney: tour.staff.find((e) => e.id === userId).info.payment
            };

            res.status(200).send(tour);
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (e) {
        console.warn(e);
    }
};

module.exports.setInvitation = async(req, res) => {
    const tourId = req.params.id;
    const userId = req.userId;
    const invitationStatus = req.body.invitationStatus;

    if(invitationStatus === 'rejects') {
        const deleteStaff = await Staff.destroy({
            where: {
                tourId, userId
            }
        });

        if(deleteStaff) {
            res.status(200).send({ message: 'Deleted staff' });
        } else {
            res.status(404).send({ message: 'Staff not found' });
        }
    } else if (invitationStatus === 'approves') {
        const updateInvitation = await Staff.update({ invitationStatus }, {
            where: {
                tourId, userId
            }
        });

        if(updateInvitation) {
            res.status(200).send({ message: 'Modified' });
        }
    }

    const tour = await Tour.findByPk(tourId);
    const manager = await User.findByPk(tour.ownerId);

    if(manager) {
        mailer.sendMail({
            from: 'testtourmanager@gmail.com',
            to: manager.email,
            subject: 'tours',
            text: 'tours',
            html: `<a>Employee ${invitationStatus} a tour</a>`
        });
    }
};

module.exports.getTours = async(req, res) => {
    const userId = req.userId;

    let sortingQuery = {};

    sortingQuery.item = req.query.item || 'startDate';
    sortingQuery.sort = req.query.sort || 'asc';

    const limit = req.query.limit || '10';

    const tours = await Tour.findAll({
        include: [
            {
                model: User,
                as: 'staff',
                through: {
                    where: { userId }
                }
            } ]
    });

    let page = +req.query.page + 1 || 1;
    let pages = Math.ceil(tours.length / limit);
    let offset = limit * (page - 1);

    try {
        let tours = await Tour.findAll({
            include: [ {
                model: Place,
                as: 'places',
                through: { attributes: [] },
                attributes: [ 'country', 'state', 'city' ]
            },
            {
                model: User,
                as: 'staff',
                where: { id: userId },
                through: { where: { invitationStatus: 'approves' }, attributes: [ 'invitationStatus', 'payment' ], as: 'info' },
                attributes: [ 'id', 'firstname', 'firstname', 'email' ]
            } ],

            order: [ [ sortingQuery.item, sortingQuery.sort ] ],
            limit: +limit,
            offset: +offset
        });

        if(tours) {
            res.status(200).send(tours);
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (e) {
        console.warn(e);
    }
};

module.exports.getToursCount = async(req, res) => {
    const userId = req.userId;

    try {
        let tours = await Tour.findAll({
            include: [
                {
                    model: User,
                    as: 'staff',
                    where: { id: userId },
                    through: { where: { invitationStatus: 'approves' }, attributes: [ 'invitationStatus', 'payment' ], as: 'info' },
                    attributes: [ 'id', 'firstname', 'firstname', 'email' ]
                }
            ]
        });

        if(tours) {
            const count = tours.length;

            res.status(200).send({ count });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (e) {
        console.warn(e);
    }
};


module.exports.earnMoney = async(req, res) => {
    const userId = req.userId;

    try {
        let tours = await Tour.findAll({
            include: [ {
                model: Place,
                as: 'places',
                through: { attributes: [] },
                attributes: [ 'country', 'state', 'city' ]
            },
            {
                model: User,
                as: 'staff',
                through: {
                    attributes: [ 'invitationStatus', 'payment' ],
                    as: 'info',
                    where: { userId }
                },
                attributes: [ 'id', 'firstname', 'firstname', 'email' ]
            } ],
            where: { state: [ 'completed' ] }

        });

        let earnMoney = 0;

        if(tours) {
            for(let tour of tours) {
                tour.staff.forEach((element) => {
                    earnMoney += element.info.payment;
                });
            }
            res.status(200).send({ earnMoney });
        } else {
            res.status(404).send({ message: 'Tours were not founded' });
        }
    } catch (e) {
        console.warn(e);
    }
};

