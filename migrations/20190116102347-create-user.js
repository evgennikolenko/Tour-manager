'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            firstname: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            lastname: {
                type: Sequelize.STRING,
                notEmpty: true
            },
            birth: {
                type: Sequelize.DATE,
                validate: {
                    isDate: true
                }
            },
            gender: {
                type: Sequelize.ENUM,
                values: [ 'male', 'female' ]
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                },
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'),
                defaultValue: 'active'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: '12.12.2012'
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: '12.12.2012'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
