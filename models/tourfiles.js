'use strict';
module.exports = (sequelize, DataTypes) => {
  const TourFiles = sequelize.define('TourFiles', {
      tourId: {
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
  TourFiles.associate = function(models) {
      TourFiles.belongsTo(models.Tour, { as: 'tour' });
  };
  return TourFiles;
};