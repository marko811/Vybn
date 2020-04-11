const ArtistModel = (sequelize, type) => {
    return sequelize.define("Artist", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      AmgId: {
        type: type.STRING,
        allowNull: true
      },
      Name: {
          type: type.STRING,
          allowNull: true
      },
      SortName: {
          type: type.STRING,
          allowNull: true
      },
      ArtistCategory:{
          type:type.STRING,
          allowNull: true
      }
    });
  };
  
  module.exports = {
    ArtistModel
  };
  