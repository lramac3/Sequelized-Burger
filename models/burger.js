module.exports = function(sequelize, DataTypes) {
 let burger = sequelize.define("burger", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    visited: {
=======
    ate: {
>>>>>>> parent of 3eb2476... updated burger.js
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  burger.associate = function(models) {
    models.burger.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return burger;
};
 