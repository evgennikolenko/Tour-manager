'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('RoleInCompanies', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            jobId: {
                allowNull: false,
                type: Sequelize.UUID
            },
            companyId: {
                allowNull: false,
                type: Sequelize.UUID
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('RoleInCompanies');
    }
};