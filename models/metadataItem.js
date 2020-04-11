const MetadataItemModel = (sequelize, type) => {
    return sequelize.define("MetadataItem", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CompId: {
        type: type.INTEGER,
        allowNull: true
      },
      MetadataTypeId: {
          type: type.INTEGER,
          allowNull: true
      },
      MetadataValue: {
          type: type.STRING,
          allowNull: true
      }
      
      
    });
  };
  
  module.exports = {
    MetadataItemModel
  };
  