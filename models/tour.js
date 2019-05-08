'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Tour = sequelize.define('Tour', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        ownerId: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true
        },
        startDate: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        endDate: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        name: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM('planned', 'started', 'completed'),
            defaultValue: 'planned',
            notEmpty: true,
            allowNull: false
        },
        generateDocFile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        underscored: true,
        scopes: {
            forWork(queue, nodeId) {
                return {
                    where: {
                        queue,
                        node_id: {
                            $or: [
                                null,
                                nodeId
                            ]
                        },
                        status: 'pending',
                        start_at: {
                            $or: [
                                null,
                                {
                                    $lt: moment().toDate(),
                                }
                            ]
                        },
                        finish_at: {
                            $or: [
                                null,
                                {
                                    $gte: moment().toDate(),
                                }
                            ]
                        }
                    },
                    order: [
                        ['startDate', 'ASC'],
                        [
                            sequelize.fn(
                                'IFNULL',
                                sequelize.col('startDate'),
                            ),
                            'ASC'
                        ]
                    ]
                };
            }
        },
        instanceMethods: {
            fail(delay, options) {
                this.startDate = delay ? moment().add(delay, 'ms').toDate() : null;
                // this.attempts = sequelize.literal('attempts + 1');
                this.status = 'failure';
                return this.save(options);
            },
            complete(options) {
                this.status = 'completed';
                return this.save(options);
            },
            work(nodeId, options) {
                this.status = 'started';
                // this.worker_node_id = nodeId;
                // this.worker_started_at = moment().toDate();
                return this.save(options);
            },
            check(options) {
                // this.checked_at = moment().toDate();
                return this.save(options);
            }
        }
    });

    Tour.associate = function(models) {

        // Tour.belongsTo(models.User);
        // Tour.belongsTo(models.User);
        // Tour.belongsTo(models.User);
        Tour.belongsToMany(models.User, {
            through: 'Staff',
            foreignKey: 'tourId',
            as: 'staff'
        });

        Tour.belongsToMany(models.Place, {
            through: 'TourPlaces',
            foreignKey: 'tourId',
            as: 'places'
        });

        Tour.hasOne(models.TourLogo, { as: 'logo', foreignKey: 'tourId' });
        Tour.hasMany(models.TourLogo, { as: 'files', foreignKey: 'tourId' });
        // Tour.belongsTo(models.User, { targetKey: 'id', foreignKey: 'ownerId' });
    };
    return Tour;
};
