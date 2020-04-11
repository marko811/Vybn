const Sequelize = require("sequelize");
const { UserModel } = require("./user");
const { ProfileModel } = require("./profile");
const { ChannelModel } = require("./channel");
const { ChannelTrackModel } = require("./channelTrack");
const { ChannelComponentModel } = require("./channelComponent");
const { TrackModel } = require("./track");
const { ArtistModel } = require("./artist");
const { ArtistComponentModel } = require("./artistComponent");
const { ArtistTypeModel } = require("./artistType");
const { AssetTypeModel } = require("./assetType");
const { CamItemModel } = require("./camItem");
const { ComponentModel } = require("./component");
const { ComponentParentModel } = require("./componentParent");
const { ComponentRecommendationModel } = require("./componentRecommendation");
const { ComponentTypeModel } = require("./componentType");
const { GenreModel } = require("./genre");
const { LabelModel } = require("./label");
const { LabelOwnerModel } = require("./labelOwner");
const { MediaFileModel } = require("./mediaFile");
const { MetadataItemModel } = require("./metadataItem");
const { MetadataTypeModel } = require("./metadataType");
const { RelatedComponentModel } = require("./relatedComponent");

// const sequelize = new Sequelize("vybn", "user", "1qaz2wsx", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   logging: true
// });

const Op = Sequelize.Op;
const operatorsAliases = {
  $not: Op.not,

  $and: Op.and,
  $or: Op.or,
  $gt: Op.gt,
  $gte: Op.gte,
  $lt: Op.lt,
  $lte: Op.lte,
  $ne: Op.ne,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $in: Op.in,
  $notIn: Op.notIn,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $any: Op.any
}

const sequelize = new Sequelize("vybn", "admin", "jVXPCvXT6wAqCNqh2yml", {
  host: "vybn.cluster-cjrv7qhjvpyi.us-west-2.rds.amazonaws.com",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: true, 
  operatorsAliases

});

const User = UserModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);
const Channel = ChannelModel(sequelize, Sequelize);
const ChannelTrack = ChannelTrackModel(sequelize, Sequelize);
const ChannelComponent = ChannelComponentModel(sequelize, Sequelize);
const Track = TrackModel(sequelize, Sequelize);
const Artist = ArtistModel(sequelize, Sequelize);
const ArtistComponent = ArtistComponentModel(sequelize, Sequelize);
const ArtistType = ArtistTypeModel(sequelize, Sequelize);
const AssetType = AssetTypeModel(sequelize, Sequelize);
const CamItem = CamItemModel(sequelize, Sequelize);
const Component = ComponentModel(sequelize, Sequelize);
const ComponentParent = ComponentParentModel(sequelize, Sequelize);
const ComponentRecommendation = ComponentRecommendationModel(sequelize, Sequelize);
const ComponentType = ComponentTypeModel(sequelize, Sequelize);
const Genre = GenreModel(sequelize, Sequelize);
const Label = LabelModel(sequelize, Sequelize);
const LabelOwner = LabelOwnerModel(sequelize, Sequelize);
const MediaFile = MediaFileModel(sequelize, Sequelize);
const MetadataItem = MetadataItemModel(sequelize, Sequelize);
const MetadataType = MetadataTypeModel(sequelize, Sequelize);
const RelatedComponent = RelatedComponentModel(sequelize, Sequelize);

Profile.belongsTo(User);
User.hasOne(Profile);

ChannelTrack.belongsTo(Track, {
  as: 'track',
  foreignKey: 'trackId'
});

ChannelComponent.belongsTo(Component, {
  as: 'component',
  foreignKey: 'CompId'
});

MediaFile.belongsTo(Component, {
  as: 'component',
  foreignKey: 'CompId'
});
Component.hasMany(MediaFile, {
  as: "MediaFiles",
  foreignKey: 'CompId'
});
Component.hasOne(ComponentParent, {
  as: "ComponentParent",
  foreignKey: 'ChildCompId'
});

Component.hasOne(ArtistComponent,{
  as: "ArtistComponent",
  foreignKey: 'CompId'
});
ArtistComponent.belongsTo(Artist, {
  as: "Artist",
  foreignKey: "ArtistId"
});

Component.hasOne(MetadataItem, {
  as: "MetadataItem",
  foreignKey: 'CompId'
});





//sequelize.sync({ force: true });
module.exports = {
  sequelize, 
  User,
  Profile,
  Channel,
  ChannelTrack,
  ChannelComponent,
  Track,
  Artist,
  ArtistComponent,
  ArtistType,
  AssetType, 
  CamItem, 
  Component, 
  ComponentParent, 
  ComponentRecommendation,  
  ComponentType, 
  Genre, 
  Label, 
  LabelOwner, 
  MediaFile, 
  MetadataItem, 
  MetadataType, 
  RelatedComponent
};
