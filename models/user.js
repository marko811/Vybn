const UserModel = (sequelize, type) => {
  return sequelize.define("User", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      allowNull: true
    },
    password: {
      type: type.STRING,
      allowNull: true
    },
    email: {
      type: type.STRING,
      allowNull: true
    },
    emailotp: {
      type: type.STRING,
      allowNull: true
    },
    emailverified: {
      type: type.BOOLEAN,
      default: false
    },
    googleauth: {
      type: type.BOOLEAN,
      default: false
    },
    facebookauth: {
      type: type.BOOLEAN,
      default: false
    }
  });
};

module.exports = {
  UserModel
};
