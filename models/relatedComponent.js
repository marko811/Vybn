const RelatedComponentModel = (sequelize, type) => {
    return sequelize.define("RelatedComponent", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CompId: {
        type: type.INTEGER,
        allowNull: true
      },
      RelatedCompId: {
          type: type.INTEGER,
          allowNull: true
      },
      Role: {
          type: type.STRING,
          allowNull: true
      }
      
      
    });
  };
  
  module.exports = {
    RelatedComponentModel
  };
  