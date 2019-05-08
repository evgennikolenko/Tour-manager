'use strict';
module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('Staff', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        tourId: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true
        },
        invitationStatus: {
            type: DataTypes.ENUM('pending', 'approves', 'rejects'),
            defaultValue: 'pending'
        },
        payment: DataTypes.DOUBLE
    }, {
        timestamps: false
    });

    Staff.associate = function(models) {

    };
    return Staff;
};
