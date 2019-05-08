module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Places', [ {
            id: '1',
            country: 'Ukraine',
            countryCode: 'ua',
            state: 'Kiev region',
            city: 'Kiev'
        },
        {
            id: '2',
            country: 'Poland',
            countryCode: 'pl',
            state: 'Masovian Voivodeship',
            city: 'Warsaw'
        },
        {
            id: '3',
            country: 'Poland',
            countryCode: 'pl',
            state: 'Lesser Poland',
            city: 'Kraków'
        },
        {
            id: '4',
            country: 'Germany',
            countryCode: 'de',
            state: 'Brandenburg',
            city: 'Berlin'
        },
        {
            id: '5',
            country: 'France',
            countryCode: 'fr',
            state: 'Île-de-France',
            city: 'Paris'
        },
        {
            id: '6',
            country: 'Spain',
            countryCode: 'es',
            state: 'Madrid metropolitan area',
            city: 'Madrid'
        },
        {
            id: '7',
            country: 'England',
            countryCode: 'gb',
            state: 'London region',
            city: 'London'
        },
        {
            id: '8',
            country: 'Canada',
            countryCode: 'ca',
            state: 'Ontario',
            city: 'Toronto'
        }
        ], {
            timestamps: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Places', null, {});
    }
};