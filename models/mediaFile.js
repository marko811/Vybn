const MediaFileModel = (sequelize, type) => {
    return sequelize.define("MediaFile", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CompId: {
        type: type.INTEGER,
        allowNull: true
      },
      AssetCode: {
          type: type.STRING,
          allowNull: true
      },
      Name: {
          type: type.STRING,
          allowNull: true
      },
      FileSize: {
          type: type.STRING,
          allowNull: true
      },
      BitRate: {
          type: type.INTEGER,
          allowNull: true
      }
      
      
    });
  };
  
  module.exports = {
    MediaFileModel
  };
  