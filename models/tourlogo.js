'use strict';
module.exports = (sequelize, DataTypes) => {
  const TourLogo = sequelize.define('TourLogo', {
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
  TourLogo.associate = function(models) {
      TourLogo.belongsTo(models.Tour, { as: 'tour' });
  };
  return TourLogo;
};