const { gql } = require("apollo-server-express");
module.exports = gql`
    extend type Query {
        components: [Component]
        component: Component
        
        searchComponent(
            searchkey: String!, 
            startId: Int=0,
            offset: Int=0,
            limit: Int=10

        ): [MNetTrack]
    }
    extend type Mutation {
        updateComponent(
            LabelId: Int
            CompCode: String
            CompTypeId: Int
            ActiveStatusCode: String
            Title: String
            Duration: String
            ParentalAdvisory: String
            Isrc: String
            ItemNumber: Int
            DiskNumber: Int
            ExclusiveInd: String
        ): Boolean
      
        createComponent(
            LabelId: Int
            CompCode: String
            CompTypeId: Int
            ActiveStatusCode: String
            Title: String
            Duration: String
            ParentalAdvisory: String
            Isrc: String
            ItemNumber: Int
            DiskNumber: Int
            ExclusiveInd: String
        ): [Component]
    }



  
    type Component {
        Id: Int
        LabelId: Int
        CompCode: String
        CompTypeId: Int
        ActiveStatusCode: String
        Title: String
        Duration: String
        ParentalAdvisory: String
        Isrc: String
        ItemNumber: Int
        DiskNumber: Int
        ExclusiveInd: String
        MediaFiles: [MediaFile]
    }

    type MediaFile{
        Id: Int
        CompId: Int
        AssetCode: String
        Name: String
        FileSize: String
        BitRate: String
    }
    

    type Artist{
        Id: Int
        MnetId: String
        Name: String
    }
    type Genre {
        Id: Int
        Name: String
    }
    type Mp3Rights {
        CanSampleStream: String
        CanPurchaseDownload: String
        AlbumPurchaseOnly: String
        CanStream: String
    }
    type Images {
        Album75x75: String
        Album150x150: String
        Album800x800: String
    }
    type Album {
        MnetId: Int
        Title: String
        Artist: Artist
        Genre: Genre
        ExplicitLyrics: String
        Label: String
        Duration: String
        ReleaseDate: String
        NumberOfTracks: Int
        FeaturedArtists: [Artist]
        Images: Images
        LabelOwnerId: Int
        Bitrate: String
        Format: String
    }
    type SampleLocation {
        Location: String
        Resource: String
        Type: String
    }
    type Composer {
        MnetId: Int
        Name: String
    } 


    type MNetTrack {
        MnetId: String
        Title: String
        Artist: Artist
        Genre: Genre
        ExplicitLyrics: String
        Duration: String
        ReleaseDate: String
        TrackNumber: Int
        DiscNumber: Int
        Mp3Rights: Mp3Rights
        FeaturedArtists: [Artist]
        Album: Album
        SampleLocations: [SampleLocation]
        Bitrate: String
        Composer: Composer
    }
`;
