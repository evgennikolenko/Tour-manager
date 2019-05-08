'use strict';
module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Job.associate = function(models) {
        // Company.belongsToMany(models.TourRole, {
        //     through: 'RoleInCompany',
        //     foreignKey: 'companyId'
        // });

        Job.hasMany(models.RoleInCompany, { foreignKey: 'jobId', as: 'job' });
    };
    return Job;
};
