const ArtistComponentModel = (sequelize, type) => {
    return sequelize.define("ArtistComponent", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CompId: {
        type: type.INTEGER,
        allowNull: false
      },
      ArtistId: {
        type: type.INTEGER,
        allowNull: false
      },
      ArtistTypeId: {
        type: type.INTEGER,
        allowNull: false
      },
      Ranking: {
        type: type.INTEGER,
        allowNull: true
      }
    });
  };
  
  module.exports = {
    ArtistComponentModel
  };
  