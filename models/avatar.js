'use strict';
module.exports = (sequelize, DataTypes) => {
    const Avatar = sequelize.define('Avatar', {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {});

    Avatar.associate = function(models) {
        Avatar.belongsTo(models.User, { as: 'user' });
    };
    return Avatar;
};
