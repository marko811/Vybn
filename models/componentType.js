const ComponentTypeModel = (sequelize, type) => {
    return sequelize.define("ComponentType", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      TypeCode: {
        type: type.STRING,
        allowNull: true
      },
      ParentInd: {
          type: type.STRING,
          allowNull: true
      },
      GenreCategory: {
          type: type.STRING,
          allowNull: true
      }
      
    });
  };
  
  module.exports = {
    ComponentTypeModel
  };
  