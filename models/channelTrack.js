const ChannelTrackModel = (sequelize, type) => {
  return sequelize.define("ChannelTrack", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    channelId: {
      type: type.INTEGER
    },
    trackId: {
      type: type.INTEGER
    },
    tierNum: {
      type: type.INTEGER
    }
  });
};

module.exports = {
  ChannelTrackModel
};
