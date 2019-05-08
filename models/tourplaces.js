'use strict';
module.exports = (sequelize, DataTypes) => {
    const TourPlaces = sequelize.define('TourPlaces', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        tourId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
            foreignKey: true
        },
        placeId: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true
        }
    }, {
        timestamps: false
    });

    TourPlaces.associate = function(models) {
        // TourPlaces.hasMany(models.Place, {
        //     foreignKey: 'placeId'
        // });
        // TourPlaces.hasMany(models.Tour, {
        //     foreignKey: 'tourId'
        // });
        // TourPlaces.belongsToMany(models.Places, { through: models.TourPlaces });
        // TourPlaces.belongsTo(models.Tour, { through: 'tourId', foreignKey: 'tourId' });
        // TourPlaces.belongsTo(models.Places, { through: 'placeId', foreignKey: 'placeId' });
    };
    return TourPlaces;
};
