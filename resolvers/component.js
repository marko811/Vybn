const {
    sequelize,
    User, 
    Profile, 
    Channel, 
    ChannelComponent,
    Track, 
    Artist, 
    ArtistComponent, 
    ArtistType, 
    AssetType, 
    CamItem, 
    Component, 
    ComponentParent, 
    ComponentType, 
    Genre, 
    Label, 
    LabelOwner, 
    MediaFile, 
    MetadataItem, 
    MetadataType, 
    RelatedComponent
} = require("../models");

module.exports = {
  Query: {
    components: async (parent, args, context, info) => {
        var limitcnt = 100;
        if(args.limit != undefined && args.limit > 0){
            limitcnt = args.limit;
        }

        const components = await Component.findAll({ limit: limitcnt });
        return components;
    },
    component: async (parent, args, context, info) => {
        var compId = 55;
        if(args.compid != undefined && args.compid > 0){
            compId = args.compid;
        }

        const component = await Component.findOne({where: { id: compId }});

        return component;
    },


    // Search function of the tracks.
    /*
        args: 
            searchkey => string.
     */
    searchComponent: async (parent, args, context, info) => {
        // console.log("args => " + JSON.stringify(args));
        // console.log("context => " + JSON.stringify(context));

        var limitcnt = 20;
        if(args.limit != undefined && args.limit > 0 && args.limit < 300){
            limitcnt = args.limit;
        }

        var searchkey = "";
        if(args.searchkey != undefined && args.searchkey != ""){
            searchkey = args.searchkey;
        }

        var offset = 0; 
        if(args.offset != undefined && args.offset != ""){
            offset = args.offset;
        }

        var startId = 0; 
        if(args.startId != undefined && args.startId != ""){
            startId = args.startId;
        }

        // 1. 
        // collect the needed Component Parent Id array.
        var query_parentIds = ' SELECT Components.Id' +
                                ' FROM Components '+
                                ' WHERE Components.`CompTypeId` = 2 AND Components.`Title` LIKE "%'+ searchkey +'%" '+
                                ' AND Components.`Id` < ' + startId +
                                ' ORDER BY Components.`ID` DESC ' +
                                ' LIMIT ' + limitcnt
                                ;
        var parentIds = "";
        // if(startId != 0){
        //     await sequelize.query(query_parentIds).spread(function(results, metadata) {
        //         // Results will be an empty array and metadata will contain the number of affected rows.
        //         if(metadata.length > 0){
        //             metadata.forEach(element => {
        //                 parentIds += element.Id + ',';
        //             });
        //             parentIds = parentIds.substr(0, (parentIds.length - 1));
        //         }
                
        //     });
        // }
        
        // 2. 
        // collect the componentIds. 
        var query_searhedComponents = ' SELECT DISTINCT Components.Id,  Components.`Title`, Artists.Id as ArtistId, Artists.`Name` AS ArtistName , ComponentParents.`ParentCompId`, Components.`createdAt` ' +
                                ' FROM Components '+
                                ' INNER JOIN `ArtistComponents` ON `ArtistComponents`.`CompId` = `Components`.`Id` ' +
                                ' INNER JOIN Artists ON Artists.`Id` = ArtistComponents.`ArtistId` ' +
                                ' INNER JOIN ComponentParents ON ComponentParents.`ChildCompId` = Components.ID ' +
                                ' WHERE `Components`.`CompTypeId` = 3 ' +
                                    ' AND ( ' +
                                        ' Components.`Title` LIKE "%' + searchkey + '%" ' +
                                        ' OR Artists.`Name` LIKE "%' + searchkey + '%" ' ;
                                        if(parentIds != ""){
                                            query_searhedComponents +=  ' OR ComponentParents.`ParentCompId` IN ('+parentIds+')'; 
                                        } 
                                        
        query_searhedComponents += ' ) ' ;
        if(startId != 0){
            query_searhedComponents += ' AND Components.`Id` < ' + startId ;
        }
        query_searhedComponents +=  ' GROUP BY Components.Id ' +
                                    ' ORDER BY Components.`ID` DESC ' +
                                    ' LIMIT ' + limitcnt
                                ;
        
        var searhedComponents = [];
        var searhedComponents_parse = [];
        await sequelize.query(query_searhedComponents).spread(function(results, metadata) {
            // Results will be an empty array and metadata will contain the number of affected rows.
            searhedComponents = metadata;
        });
        console.log(searhedComponents);

        // 3. collect the media data based on the searched components 
        var componentIds = [];
        var componentParentIds = [];
        var componentParents_parse = [];

        searhedComponents.forEach(element => {
            componentIds.push(element.Id);
            searhedComponents_parse[element.Id] = element;
            if(element.ParentCompId != null){
                componentParentIds.push(element.ParentCompId);
            }
        });
        const components = await Component.findAll({
            where: {
                Id: {$in: componentIds}
            },
            // include: [
            //     { model: MediaFile, as: "MediaFiles"}
            // ]
        });
        
        // 4. get the component parents info.
        var componentParents = await Component.findAll({
            where: {
                Id: {$in: componentParentIds},
                CompTypeId: 2 // search only Aulbums.
            },
            include: [
                { model: MediaFile, as: "MediaFiles"},
                // { model: ArtistComponent, as: "ArtistComponent"},
            ],
        });
        componentParents.forEach(component => {
            componentParents_parse[component.Id] = component;
        });


        // 5. merge tables. searhedComponents, components
        const res_components = [];
        
        components.forEach(component => {
            var componentId = component.Id;
            var componentParentId = 0;
            var artistId = 0;
            var artistName = "";
            var compTitle = "";
            if(searhedComponents_parse[componentId] != undefined){
                compTitle = searhedComponents_parse[componentId].Title != undefined ? searhedComponents_parse[componentId].Title : "";
                artistName = searhedComponents_parse[componentId].ArtistName != undefined ? searhedComponents_parse[componentId].ArtistName : "";
                componentParentId = searhedComponents_parse[componentId].ParentCompId != undefined ? searhedComponents_parse[componentId].ParentCompId : "";
                artistId = searhedComponents_parse[componentId].ArtistId != null ? searhedComponents_parse[componentId].ArtistId : 0;
            }
            
            // get album.
            var componentParentAlbum;
            var Images = [];
            if(componentParents_parse[componentParentId] != undefined){
                componentParentAlbum = componentParents_parse[componentParentId];

                // get the Images info.
                if(componentParents_parse[componentParentId].MediaFiles != null){
                    var mediafiles = componentParents_parse[componentParentId].MediaFiles;
                    var album_pre_link = "http://images.mndigital.com/albums/";

                    var str_componentParentId = componentParentId.toString();
                    if(str_componentParentId.length < 9){
                        var a = 9 - str_componentParentId.length;
                        for(var i = 0; i < a; i ++){
                            str_componentParentId = '0' + str_componentParentId;
                        }
                    }

                    var img_sublocation = str_componentParentId.substr(0,3) + '/' + str_componentParentId.substr(3,3) + '/' + str_componentParentId.substr(6,3) + '/';
                    album_pre_link += img_sublocation;

                    Images['Album150x150'] = album_pre_link + 'm.jpeg';     
                    Images['Album75x75'] = album_pre_link + 's.jpeg';     
                    Images['Album800x800'] = album_pre_link + 'g.jpeg';     
                    
                    // mediafiles.forEach(mediafile => {
                    //     switch (Number(mediafile.AssetCode)) {
                    //         case 500:
                    //             Images['Album150x150'] = album_pre_link + 'm.jpeg';     
                    //             break;
                    //         case 501:
                    //             Images['Album75x75'] = album_pre_link + 's.jpeg';     
                    //             break;
                    //         case 502:
                    //             Images['Album800x800'] = album_pre_link + 'g.jpeg';     
                    //             break;
                    //         default:
                    //             break;
                    //     };
                    // });
                }
            }
            
            var res_component = {
                MnetId: componentId,
                Title: compTitle,
                Artist: {
                    Id: artistId,
                    MnetId: componentId,
                    Name: artistName 
                },
                Genre: 'component.Genre.Name',
                ExplicitLyrics: component.ExclusiveInd,
                Duration: component.Duration,
                ReleaseDate: component.CreatedAt,
                TrackNumber: component.ItemNumber,
                DiscNumber: component.DiskNumber,
                Mp3Rights: {
                    CanSampleStream: true,
                    CanPurchaseDownload: true,
                    AlbumPurchaseOnly: true,
                    CanStream: true
                },
                FeaturedArtists: [artistId],
                Album: {
                    MnetId: componentParentAlbum != null ? componentParentAlbum.Id : null,
                    Title: componentParentAlbum != null ? componentParentAlbum.Title : null,
                    Artist: null,
                    Genre: null,
                    ExplicitLyrics: componentParentAlbum != null ? componentParentAlbum.ExclusiveInd : null,
                    Label: null,
                    Duration: componentParentAlbum != null ? componentParentAlbum.Duration : null,
                    ReleaseDate: componentParentAlbum != null ? componentParentAlbum.CreatedAt : null,
                    NumberOfTracks: componentParentAlbum != null ? componentParentAlbum.ItemNumber : null,
                    FeaturedArtists: [artistId], //????
                    Images: Images,
                    LabelOwnerId: null,
                    Bitrate: null,
                    Format: null
                }
                
            };

            res_components.push(res_component);
        });

        return res_components;





        // get the main components for the search track.
        // const components = await Component.findAll({ 
        //     where: {
        //         Title: { $like : "%" + searchkey + "%"},
        //         Id: {$lt: startId},
        //         CompTypeId: 3 // search only tracks.
        //     },
            
        //     include: [
        //         { model: MediaFile, as: "MediaFiles"},
        //         { model: ArtistComponent, as: "ArtistComponent"},
        //         { model: MetadataItem , as: "MetadataItem"},
        //         { model: ComponentParent, as: "ComponentParent"},
        //     ],
            
        //     order: [['Id','DESC']],
        //     offset: offset,
        //     limit: limitcnt 

        // });

        // console.log(components);
        
        // const res_components = [];
        // var componentIds = [];
        // var componentParentIds = [];
        // var componentParents_parse = [];
        // var artistIds = [];
        // var artists_parse = [];
        
        // components.forEach(component => {
        //     componentIds.push(component.Id);
        //     if(component.ComponentParent != null){
        //         componentParentIds.push(component.ComponentParent.ParentCompId);
        //     }
        //     if(component.ArtistComponent != null){
        //         artistIds.push(component.ArtistComponent.ArtistId);
        //     }
            
        // });
        
        // var artists = await Artist.findAll({
        //     where:{
        //         Id: { $in: artistIds}
        //     }
        // });
        // artists.forEach(artist=> {
        //     artists_parse[artist.Id] = artist;
        // });

        // var componentParents = await Component.findAll({
        //     where: {
        //         Id: {$in: componentParentIds},
        //         CompTypeId: 2 // search only Aulbums.
        //     },
        //     include: [
        //         { model: MediaFile, as: "MediaFiles"},
        //         { model: ArtistComponent, as: "ArtistComponent"},
        //     ],
        // });
        // componentParents.forEach(component => {
        //     componentParents_parse[component.Id] = component;
        // })

        // components.forEach(component => {
        //     var artistId = component.ArtistComponent != null ? component.ArtistComponent.ArtistId : 0;
        //     var componentParentId = component.ComponentParent != null ? component.ComponentParent.ParentCompId : 0;
        //     // get the Artist.
        //     var artist;
        //     if(artists_parse[artistId] != undefined){
        //         artist = artists_parse[artistId];
        //     }
            
        //     // get album.
        //     var componentParentAlbum;
        //     var Images = [];
        //     if(componentParents_parse[componentParentId] != undefined){
        //         componentParentAlbum = componentParents_parse[componentParentId];

        //         // get the Images info.
        //         if(componentParents_parse[componentParentId].MediaFiles != null){
        //             var mediafiles = componentParents_parse[componentParentId].MediaFiles;
        //             var album_pre_link = "http://images.mndigital.com/albums/";

        //             var str_componentParentId = componentParentId.toString();
        //             if(str_componentParentId.length == 8){
        //                 str_componentParentId = '0' + str_componentParentId;
        //             }
        //             var img_sublocation = str_componentParentId.substr(0,3) + '/' + str_componentParentId.substr(3,3) + '/' + str_componentParentId.substr(6,3) + '/';
        //             album_pre_link += img_sublocation;

        //             mediafiles.forEach(mediafile => {
        //                 switch (Number(mediafile.AssetCode)) {
        //                     case 500:
        //                         Images['Album150x150'] = album_pre_link + 'm.jpeg';     
        //                         break;
        //                     case 501:
        //                         Images['Album75x75'] = album_pre_link + 's.jpeg';     
        //                         break;
        //                     case 502:
        //                         Images['Album800x800'] = album_pre_link + 'g.jpeg';     
        //                         break;
        //                     default:
        //                         break;
        //                 };
                        
                        
        //             });
        //         }
        //     }
            
        //     var res_component = {
        //         MnetId: component.Id,
        //         Title: component.Title,
        //         Artist: {
        //             Id: (artist != null) ? artist.Id : null ,
        //             MnetId: (artist != null) ? component.Id : null ,
        //             Name: (artist != null) ? artist.Name : null 
        //         },
        //         Genre: 'component.Genre.Name',
        //         ExplicitLyrics: component.ExclusiveInd,
        //         Duration: component.Duration,
        //         ReleaseDate: component.CreatedAt,
        //         TrackNumber: component.ItemNumber,
        //         DiscNumber: component.DiskNumber,
        //         Mp3Rights: {
        //             CanSampleStream: true,
        //             CanPurchaseDownload: true,
        //             AlbumPurchaseOnly: true,
        //             CanStream: true
        //         },
        //         FeaturedArtists: [artistId],
        //         Album: {
        //             MnetId: componentParentAlbum != null ? componentParentAlbum.Id : null,
        //             Title: componentParentAlbum != null ? componentParentAlbum.Title : null,
        //             Artist: null,
        //             Genre: null,
        //             ExplicitLyrics: componentParentAlbum != null ? componentParentAlbum.ExclusiveInd : null,
        //             Label: null,
        //             Duration: componentParentAlbum != null ? componentParentAlbum.Duration : null,
        //             ReleaseDate: componentParentAlbum != null ? componentParentAlbum.CreatedAt : null,
        //             NumberOfTracks: componentParentAlbum != null ? componentParentAlbum.ItemNumber : null,
        //             FeaturedArtists: [artistId], //????
        //             Images: Images,
        //             LabelOwnerId: null,
        //             Bitrate: null,
        //             Format: null
        //         }
                
        //     };

        //     res_components.push(res_component);
        // });
        
        // return res_components;
    }


  },

  Mutation: {
    
    
  },

  
};
