'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserRoleInTours', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                foreignKey: true
            },
            roleInCompanyId: {
                allowNull: false,
                type: Sequelize.UUID,
                foreignKey: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserRoleInTours');
    }
};