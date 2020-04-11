const LabelOwnerModel = (sequelize, type) => {
    return sequelize.define("LabelOwner", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CorpCode: {
        type: type.STRING,
        allowNull: true
      },
      LabelOwnerName: {
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
    LabelOwnerModel
  };
  