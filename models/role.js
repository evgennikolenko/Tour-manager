'use strict';
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role: {
            type: DataTypes.ENUM('manager', 'employee'),
            defaultValue: 'employee'
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {});

    Role.associate = function(models) {
        Role.belongsTo(models.User, { as: 'user' });
    };
    return Role;
};
