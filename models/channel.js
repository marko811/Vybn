const ChannelModel = (sequelize, type) => {
  return sequelize.define("Channel", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: type.INTEGER,
      allowNull: false
    },
    stationName: {
      type: type.STRING,
      allowNull: false
    },
    albumimage: {
      type: type.STRING,
      allowNull: false
    },
    tracks: {
      type: type.STRING,
      allowNull: true
    },
    tracks1: {
      type: type.STRING,
      allowNull: true
    },
    tracks2: {
      type: type.STRING,
      allowNull: true
    },
    tracksH: {
      type: type.STRING,
      allowNull: true
    },
    exploreValue: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    freHeart: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    freTier1: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 200
    },
    freTier2: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 300
    },
    freBinoculars: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 400
    }
  });
};

module.exports = {
  ChannelModel
};
