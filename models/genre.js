const GenreModel = (sequelize, type) => {
    return sequelize.define("Genre", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: type.STRING,
        allowNull: true
      },
      GenreCategory: {
          type: type.STRING,
          allowNull: true
      },
      GenreType: {
          type: type.STRING,
          allowNull: true
      },
      ParentGenreId: {
          type: type.INTEGER,
          allowNull: true
      }
      
    });
  };
  
  module.exports = {
    GenreModel
  };
  