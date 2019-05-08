'use strict';
module.exports = (sequelize, DataTypes) => {
    const RoleInCompany = sequelize.define('RoleInCompany', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        jobId: {
            allowNull: false,
            type: DataTypes.UUID,
            foreignKey: true
        },
        companyId: {
            allowNull: false,
            type: DataTypes.UUID,
            foreignKey: true
        }
    }, {
        timestamps: false
    });

    RoleInCompany.associate = function(models) {
        // Avatar.belongsTo(models.User, { as: 'user' });
        // RoleInCompany.belongsToMany(models.User, {
        //     through: 'UserRoleInTour',
        //     foreignKey: 'roleInCompanyId',
        //     as: 'roleInTour'
        // });
        RoleInCompany.hasOne(models.UserRoleInTour, { foreignKey: 'roleInCompanyId', as: 'info' });

        RoleInCompany.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });

        // RoleInCompany.belongsTo(models.TourRole, { foreignKey: 'tourRoleId', as: 'job' });
        RoleInCompany.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
    };
    return RoleInCompany;

};
