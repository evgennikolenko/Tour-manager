'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TourPlaces', {
            id: {
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
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
            placeId: {
                type: Sequelize.UUID,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'Places',
                    key: 'id'
                }
            }
        }, {
            timestamps: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TourPlaces');
    }
};
