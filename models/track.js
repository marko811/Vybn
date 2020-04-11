const TrackModel = (sequelize, type) => {
  return sequelize.define("Track", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    MnetId: {
      type: type.STRING,
      allowNull: false
    },
    title: {
      type: type.STRING,
      allowNull: false
    },
    name: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    imgsource: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    imgsource150: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    musicsource: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    artistMnetId: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    genre: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    explicitLyrics: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    releaseDate: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    bitrate: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    duration: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    trackNumber: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    discNumber: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    },
    albumMnetId: {
      type: type.STRING,
      allowNull: false,
      defaultValue: ''
    }
  });
};

module.exports = {
  TrackModel
};
