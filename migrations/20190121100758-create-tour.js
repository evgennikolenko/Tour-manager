'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Tours', {
            id: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            ownerId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            startDate: {
                type: Sequelize.DATE,
                validate: {
                    isDate: true
                }
            },
            endDate: {
                type: Sequelize.DATE,
                validate: {
                    isDate: true
                }
            },
            name: {
                type: Sequelize.STRING,
                notEmpty: true,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                notEmpty: true,
                allowNull: false
            },
            generateDocFile: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            state: {
                type: Sequelize.ENUM(),
                values: [ 'planned', 'started', 'completed' ],
                defaultValue: 'planned',
                notEmpty: true,
                allowNull: false
            }
        }, {
            timestamps: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Tours');
    }
};
