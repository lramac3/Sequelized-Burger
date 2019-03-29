module.exports = function(sequelize, DataTypes) {
 let burger = sequelize.define("burger", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ate: {
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
 