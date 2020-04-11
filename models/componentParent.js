const ComponentParentModel = (sequelize, type) => {
    return sequelize.define("ComponentParent", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ParentCompId: {
        type: type.INTEGER,
        allowNull: true
      },
      ChildCompId: {
          type: type.INTEGER,
          allowNull: true
      }
      
    });
  };
  
  module.exports = {
    ComponentParentModel
  };
  