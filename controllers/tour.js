const Tour = require('./../models').Tour;
const Place = require('./../models').Place;
const Staff = require('./../models').Staff;
const User = require('./../models').User;
const Role = require('./../models').Role;
const Avatar = require('./../models').Avatar;
const TourLogo = require('./../models').TourLogo;
const RoleInCompany = require('./../models').RoleInCompany;
const Company = require('./../models').Company;
const Job = require('./../models').Job;
const UserRoleInTour = require('./../models').UserRoleInTour;
const socketConfig = require('../config/socket-singletion');
const OAuth = require('oauth');
const request2 = require('request');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const mailer = require('./../utils/sendMailer');

global.fetch = require('node-fetch');

module.exports.createTour = async(req, res, next) => {
    const ownerId = req.userId;
    let placesId = [];
    let staffId = [];
    let emailes = [];

    for (let item of JSON.parse(req.body.places)) {
        placesId.push(item.id);
    }

    for (let item of JSON.parse(req.body.staff)) {
        staffId.push(item.id);
    }

    const tourObj = {
        ownerId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        name: req.body.name,
        description: req.body.description,
        generateDocFile: JSON.parse(req.body.generateDocFile),
        staff: JSON.parse(req.body.staff),
        places: JSON.parse(req.body.places)
    };

    try {
        Promise.all([ Tour.create(tourObj), Place.findAll({ where: { id: placesId } }), User.findAll({ where: { id: staffId } }) ])
            .then(([ tour, place, staff, logo ]) => {
                tour.addPlace(place);
                tour.addStaff(staff).then(() => {
                    TourLogo.create({
                        tourId: tour.id,
                        name: req.file.originalname,
                        type: req.file.mimetype,
                        path: req.file.url
                    });
                })
                    .then(() => {
                        for (let item of staff) {
                            emailes.push(item.email);
                        }
                        for (let item of JSON.parse(req.body.staff)) {
                            Staff.update({ payment: item.payment },
                                { where: { tourId: tour.id, userId: item.id } });
                        }
                    }).then(() => {
                        mailer.sendMail({
                            from: 'testtourmanager@gmail.com',
                            to: emailes,
                            subject: 'tours',
                            text: 'tours',
                            html: '<a>Confirm tour</a>'
                        });
                        res.status(201).send(tourObj);
                    });
            }).catch((err) => res.status(400).send({ message: err.message }));
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
};


// http://localhost:9000/api/manager/tours?item=name&sort=asc
module.exports.getTours = async(req, res) => {

    const sortingQuery = {};

    sortingQuery.item = req.query.item || 'startDate';
    sortingQuery.sort = req.query.sort || 'asc';

    const limit = req.query.limit || '10';

    const ownerId = req.userId;
    const tours = await Tour.findAll({ where: { ownerId } });
    let page = +req.query.page + 1 || 1;
    let pages = Math.ceil(tours.length / limit);
    let offset = limit * (page - 1);

    try {
        const tours = await Tour.findAll(
            {
                include: [ {
                    model: Place,
                    as: 'places',
                    through: { attributes: [] },
                    attributes: [ 'country', 'state', 'city' ]
                },
                {
                    model: TourLogo,
                    as: 'logo',
                    attributes: [ 'path' ]
                },
                {
                    model: User,
                    as: 'staff',
                    through: { attributes: [ 'invitationStatus', 'payment' ], as: 'info' },
                    include: [ {
                        model: Avatar,
                        as: 'avatar',
                        attributes: [ 'name', 'type', 'path' ]
                    },
                        {
                            model: Role,
                            as: 'role',
                            where: { role: 'employee' },
                            attributes: [ 'role' ]
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
                        }],
                    attributes: [ 'firstname', 'lastname', 'gender', 'email', 'birth', 'status', 'createdAt' ]
                } ],
                where: { ownerId },
                order: [ [ sortingQuery.item, sortingQuery.sort ] ],
                limit: +limit,
                offset: +offset
            }
        );

        if(tours) {
            res.status(200).send(tours);
        } else {
            res.status(404).send({ message: 'Not found the tours' });
        }
    } catch (e) {
        console.log(e);
    }
};

// http://localhost:9000/api/manager/tours/count
module.exports.getToursCount = async(req, res) => {

    const ownerId = req.userId;

    try {
        const tours = await Tour.findAll({ where: { ownerId } });

        if(tours) {
            const count = tours.length;

            res.status(200).send({ count });
        } else {
            res.status(404).send({ message: 'Not found the tours' });
        }
    } catch (e) {
        console.log(e);
    }
};

// http://localhost:9000/api/manager/tour/:id
module.exports.getTour = async(req, res) => {
    const tourId = req.params.id;

    try {
        const tours = await Tour.findOne(
            {
                include: [ {
                    model: Place,
                    as: 'places',
                    through: { attributes: [] },
                    attributes: [ 'id', 'country', 'countryCode', 'state', 'city' ]
                },
                {
                    model: TourLogo,
                    as: 'logo',
                    attributes: [ 'path' ]
                },
                    {
                        model: User,
                        as: 'staff',
                        through: { attributes: [ 'invitationStatus', 'payment' ], as: 'info' },
                        include: [ {
                            model: Avatar,
                            as: 'avatar',
                            attributes: [ 'name', 'type', 'path' ]
                        },
                            {
                                model: Role,
                                as: 'role',
                                where: { role: 'employee' },
                                attributes: [ 'role' ]
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
                    }
                ],
                where: { id: tourId }
            }
        );

        if(tours) {
            res.status(200).send(tours);
        } else {
            res.status(404).send({ message: 'Not found a tour' });
        }
    } catch (e) {
        console.log(e);
    }
};

// http://localhost:9000/api/manager/tours/update
module.exports.updateTour = async(req, res) => {
    const id = req.params.id;
    const ownerId = req.userId;

    let placesId = [];
    let staffId = [];

    for (let item of req.body.places) {
        placesId.push(item.id);
    }

    for (let item of req.body.staff) {
        staffId.push(item.id);
    }

    const tour = await Tour.findByPk(id);

    try {
        Promise.all([ tour.update({
            ownerId,
            ...req.body
        }), Place.findAll({ where: { id: placesId } }), Staff.destroy({ where: { tourId: id } }), User.findAll({ where: { id: staffId } }) ])
            .then(([ tour, place, des, staff ]) => {
                tour.setPlaces(place);
                tour.addStaff(staff)
                    .then(() => {
                        for (let item of req.body.staff) {

                            Staff.update({ payment: item.payment },
                                { where: { tourId: tour.id, userId: item.id } });
                        }
                    });
                res.status(201).send({ message: 'Tour was updated' });
            }).catch((err) => res.status(400).send({ message: err.message }));
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
};


module.exports.getSpentMoney = async(req, res) => {

    const ownerId = req.userId;

    try {
        const tours = await Tour.findAll({
            include: [ {
                model: User,
                as: 'staff',
                through: { attributes: [ 'invitationStatus', 'payment' ], as: 'info' },
                attributes: [ 'id' ]
            } ],
            where: {
                ownerId,
                state: 'completed'
            }
        });

        let spentMoney = 0;

        if(tours) {
            for(let tour of tours) {
                tour.staff.forEach((element) => {
                    spentMoney += element.info.payment;
                });
            }
            res.status(200).send({ spentMoney });
        } else {
            res.status(404).send({ message: 'Tours were not founded' });
        }

    } catch (e) {
        console.warn(e);
    }
};

module.exports.getPlaces = async(req, res) => {
    try {
        const places = await Place.findAll({
            order: [ [ 'country', 'asc' ] ]
        });

        if(places) {
            res.status(200).send(places);
        } else {
            res.status(404).send({ message: 'places were not founded' });
        }
    } catch (e) {
        console.warn(e);
    }
};

module.exports.getWeather = async(req, res) => {
    const place = req.body;

    const header = {
        'Yahoo-App-Id': 'ApDg437i'
    };

    let cityImg = await fetch(`https://api.teleport.org/api/urban_areas/slug:${place.city.toLowerCase()}/images/`)
        .then(toJson);

    const { photos } = cityImg;

    cityImg = photos[ 0 ].image.web;

    const request = new OAuth.OAuth(
        null,
        null,
        'dj0yJmk9aVg5cG5IWW5xdjg4JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTdi',
        '1171db2de605760387857b8de12941afded6bee9',
        '1.0',
        null,
        'HMAC-SHA1',
        null,
        header
    );

    request.get(
        `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${place.city},${place.country}'&format=json&u=c`,
        null,
        null,
        function(err, data, result) {
            if (err) {
                console.log(err);
            } else {
                let weather = JSON.parse(data);

                weather.cityImg = cityImg;
                res.send(JSON.stringify(weather));
            }
        }
    );
}

