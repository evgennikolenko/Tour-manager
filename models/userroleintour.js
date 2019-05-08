'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserRoleInTour = sequelize.define('UserRoleInTour', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        userId: {
            allowNull: false,
            type: DataTypes.UUID,
            foreignKey: true
        },
        roleInCompanyId: {
            allowNull: false,
            type: DataTypes.UUID,
            foreignKey: true
        }
    }, {
        timestamps: false
    });

    UserRoleInTour.associate = function(models) {
        // Avatar.belongsTo(models.User, { as: 'user' });

        UserRoleInTour.belongsTo(models.User, { as: 'user' });
        UserRoleInTour.belongsTo(models.RoleInCompany, { as: 'roleInCompany' });

    };
    return UserRoleInTour;
};
