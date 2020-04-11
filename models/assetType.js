const AssetTypeModel = (sequelize, type) => {
    return sequelize.define("AssetType", {
      Id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      AssetCode: {
        type: type.STRING,
        allowNull: true
      },
      AssetCodeTag: {
          type: type.STRING,
          allowNull: true
      },
      Description: {
          type: type.STRING,
          allowNull: true
      },
      DescriptionCode:{
          type:type.STRING,
          allowNull: true
      },
      DrmCode: {
          type: type.STRING,
          allowNull: true
      },
      FileExtension: {
          type: type.STRING,
          allowNull: true
      },
      BuyPriceScopeId: {
          type: type.INTEGER,
          allowNull: true
      }
    });
  };
  
  module.exports = {
    AssetTypeModel
  };
  