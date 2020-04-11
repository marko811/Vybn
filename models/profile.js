const ProfileModel = (sequelize, type) => {
  return sequelize.define("Profile", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: type.STRING,
      allowNull: true,
      defaultValue: "Unknown"
    },
    profilePic: {
      type: type.STRING,
      defaultValue: "profile.png"
    },
    plan_type: {
      type: type.STRING,
      allowNull: true,
      defaultValue: "free"
    },
    private: {
      type: type.BOOLEAN,
      defaultValue: false
    },
    color_scheme: {
      type: type.INTEGER,
      default: false,
      defaultValue: 1
    }
  });
};

module.exports = {
  ProfileModel
};
