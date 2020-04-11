const MetadataTypeModel = (sequelize, type) => {
    return sequelize.define("MetadataType", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      TypeCode: {
        type: type.STRING,
        allowNull: true
      }
      
      
    });
  };
  
  module.exports = {
    MetadataTypeModel
  };
  