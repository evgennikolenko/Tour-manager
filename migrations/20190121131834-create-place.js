'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Places', {
            id: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true
            },
            countryCode: {
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true
            }
        }, {
            timestamps: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Places');
    }
};
