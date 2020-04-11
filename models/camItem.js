const CamItemModel = (sequelize, type) => {
    return sequelize.define("CamItem", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ParentTypeId: {
        type: type.INTEGER,
        allowNull: true
      },
      DesignatedParentAssetCode: {
          type: type.STRING,
          allowNull: true
      },
      ChildTypeId: {
          type: type.INTEGER,
          allowNull: true
      },
      ChildAssetCode:{
          type:type.STRING,
          allowNull: true
      },
      OptionalInd: {
          type: type.STRING,
          allowNull: true
      }
    });
  };
  
  module.exports = {
    CamItemModel
  };
  