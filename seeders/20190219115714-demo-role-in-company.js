module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('RoleInCompanies', [ {
            id: 'b3771644-343d-11e9-b210-d663bd873d93',
            jobId: '855e1d3c-343a-11e9-b210-d663bd873d93',
            companyId: '69c45a58-343c-11e9-b210-d663bd873d93'
        },
            {
                id: 'b37718d8-343d-11e9-b210-d663bd873d93',
                jobId: '855e1d3c-343a-11e9-b210-d663bd873d93',
                companyId: '69c45b98-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b3771a5e-343d-11e9-b210-d663bd873d93',
                jobId: 'b488c828-343a-11e9-b210-d663bd873d93',
                companyId: '69c45472-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b3771bc6-343d-11e9-b210-d663bd873d93',
                jobId: 'b488c828-343a-11e9-b210-d663bd873d93',
                companyId: '69c458e6-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b377215c-343d-11e9-b210-d663bd873d93',
                jobId: 'bf86188e-343a-11e9-b210-d663bd873d93',
                companyId: '69c45cce-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b37722ba-343d-11e9-b210-d663bd873d93',
                jobId: 'bf86188e-343a-11e9-b210-d663bd873d93',
                companyId: '69c45e0e-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b37723f0-343d-11e9-b210-d663bd873d93',
                jobId: 'de736c88-343a-11e9-b210-d663bd873d93',
                companyId: '69c45cce-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b3772544-343d-11e9-b210-d663bd873d93',
                jobId: 'f29dfcdc-343a-11e9-b210-d663bd873d93',
                companyId: '69c463c2-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b377268e-343d-11e9-b210-d663bd873d93',
                jobId: '0bfab0e4-343b-11e9-b210-d663bd873d93',
                companyId: '69c464ee-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b37727d8-343d-11e9-b210-d663bd873d93',
                jobId: '0bfab0e4-343b-11e9-b210-d663bd873d93',
                companyId: '69c464ty-343c-11e9-b210-d663bd873d93'
            },
            {
                id: 'b3772bac-343d-11e9-b210-d663bd873d93',
                jobId: '108f93ae-343b-11e9-b210-d663bd873d93',
                companyId: '69c4628c-343c-11e9-b210-d663bd873d93'
            },

        ], {
            timestamps: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('RoleInCompanies', null, {});
    }
};