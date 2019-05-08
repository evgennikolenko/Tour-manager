'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Staffs', {
            id: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            tourId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'Tours',
                    key: 'id'
                }
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            invitationStatus: {
                type: Sequelize.ENUM('pending', 'approves', 'rejects'),
                defaultValue: 'pending'
            },
            payment: {
                type: Sequelize.DOUBLE
            }
        }, {
            timestamps: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Staffs');
    }
};