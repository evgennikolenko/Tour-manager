module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('UserRoleInTours', [ {
            id: 'a81acda0-3441-11e9-b210-d663bd873d93',
            userId: '4c065fc3-2917-489e-bca1-52f980533211',
            roleInCompanyId: 'b37727d8-343d-11e9-b210-d663bd873d93'
        }

        ], {
            timestamps: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('UserRoleInTours', null, {});
    }
};