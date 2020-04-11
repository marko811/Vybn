const LabelModel = (sequelize, type) => {
    return sequelize.define("Label", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      LabelOwnerId: {
        type: type.INTEGER,
        allowNull: true
      },
      LabelName: {
          type: type.STRING,
          allowNull: true
      },
      ActiveStatusCode: {
          type: type.STRING,
          allowNull: true
      }
      
      
    });
  };
  
  module.exports = {
    LabelModel
  };
  