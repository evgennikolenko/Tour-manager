module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Jobs', [ {
            id: '855e1d3c-343a-11e9-b210-d663bd873d93',
            name: 'driver'
        },
            {
                id: 'b488c828-343a-11e9-b210-d663bd873d93',
                name: 'security guard'
            },
            {
                id: 'bf86188e-343a-11e9-b210-d663bd873d93',
                name: 'guide'
            },
            {
                id: 'de736c88-343a-11e9-b210-d663bd873d93',
                name: 'assistant'
            },
            {
                id: 'f29dfcdc-343a-11e9-b210-d663bd873d93',
                name: 'doctor'
            },
            {
                id: '0bfab0e4-343b-11e9-b210-d663bd873d93',
                name: 'cook'
            },
            {
                id: '108f93ae-343b-11e9-b210-d663bd873d93',
                name: 'animator'
            }
        ], {
            timestamps: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Jobs', null, {});
    }
};