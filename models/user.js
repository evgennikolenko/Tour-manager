'use strict';
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        birth: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        gender: {
            type: DataTypes.ENUM,
            values: [ 'male', 'female' ]
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    }, {});

    User.associate = function(models) {

        User.belongsToMany(models.Tour, {
            through: 'Staff',
            foreignKey: 'userId'
        });

        // User.belongsToMany(models.RoleInCompany, {
        //     through: 'UserRoleInTour',
        //     foreignKey: 'userId',
        //     as: 'roleInTour'
        // });

        User.hasOne(models.UserRoleInTour, { as: 'roleInTour', foreignKey: 'userId' });
        User.hasOne(models.Avatar, { as: 'avatar', foreignKey: 'userId' });
        User.hasOne(models.Role, { as: 'role', foreignKey: 'userId' });
    };

    return User;
};
