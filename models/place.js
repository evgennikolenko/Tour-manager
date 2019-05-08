'use strict';
module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('Place', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        country: DataTypes.STRING,
        countryCode: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING
    }, {
        timestamps: false
    });

    Place.associate = function(models) {
        Place.belongsToMany(models.Tour, {
            through: 'TourPlaces',
            foreignKey: 'placeId'
        });
    };

    return Place;
};
