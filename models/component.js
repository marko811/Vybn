const ComponentModel = (sequelize, type) => {
    return sequelize.define("Component", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      LabelId: {
        type: type.INTEGER,
        allowNull: true
      },
      CompCode: {
          type: type.STRING,
          allowNull: true
      },
      CompTypeId: {
          type: type.INTEGER,
          allowNull: true
      },
      ActiveStatusCode: {
          type: type.STRING,
          allowNull: true
      },
      Title: {
          type: type.STRING,
          allowNull: true
      },
      Duration: {
          type: type.STRING,
          allowNull: true
      },
      ParentalAdvisory: {
          type: type.STRING,
          allowNull: true
      },
      Isrc: {
          type: type.STRING,
          allowNull: true
      },
      ItemNumber: {
          type: type.INTEGER,
          allowNull: true
      },
      DiskNumber: {
          type: type.INTEGER,
          allowNull: true
      },
      ExclusiveInd: {
          type: type.STRING,
          allowNull: true
      }
      
    });
  };
  
  module.exports = {
    ComponentModel
  };
  