module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = function(models) {
    models.User.hasMany(models.burger, {
      onDelete: "cascade",
    });
  };
  return User;
};
