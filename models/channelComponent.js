const ChannelComponentModel = (sequelize, type) => {
  return sequelize.define("ChannelComponent", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    channelId: {
      type: type.INTEGER
    },
    compId: {
      type: type.INTEGER
    },
    tierNum: {
      type: type.INTEGER
    }
  });
};

module.exports = {
  ChannelComponentModel
};
