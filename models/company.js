'use strict';
module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });

    Company.associate = function(models) {
        // Company.belongsToMany(models.TourRole, {
        //     through: 'RoleInCompany',
        //     foreignKey: 'companyId'
        // });

        Company.hasMany(models.RoleInCompany, { foreignKey: 'companyId', as: 'company' });
    };
    return Company;
};
