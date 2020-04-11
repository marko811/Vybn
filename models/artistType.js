const ArtistTypeModel = (sequelize, type) => {
    return sequelize.define("ArtistType", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      TypeCode: {
        type: type.STRING,
        allowNull: false
      }
    });
  };
  
  module.exports = {
    ArtistTypeModel
  };
  