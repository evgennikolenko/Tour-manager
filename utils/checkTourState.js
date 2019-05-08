const Tour = require('./../models/').Tour;
const moment = require('moment');
const dateformat = require('dateformat');

module.exports.checkState = () => {
    Promise.all([ Tour.findAll({ where: { state: 'planned' } }), Tour.findAll({ where: { state: 'started' } }) ])
        .then(([ plannedTours, startedTours ]) => {
            plannedTours.forEach((item) => {
                if(dateformat(item.startDate, 'yyyy-mm-dd') === moment().format('YYYY-MM-DD')) {
                    item.update({
                        state: 'started'
                    }).then(() => console.log(`Tour ${item.name} state was changed on planed`));
                }
            });
            startedTours.forEach((item) => {
                if (dateformat(item.endDate, 'yyyy-mm-dd') === moment().format('YYYY-MM-DD')) {
                    item.update({
                        state: 'completed'
                    }).then(() => console.log(`Tour ${item.name} state was changed on completed`));
                }
            });
        });
};
