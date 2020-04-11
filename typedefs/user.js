const { gql } = require("apollo-server-express");
module.exports = gql`
  extend type Query {
    users: [User]
    user: User
    profile: Profile
    mychannels: [Channel]
    randomTrack(position: Float!): Track
  }
  extend type Mutation {
      createUser(email: String!): Token
      forgetPassword(email: String!): Token
      verifyEmail(otp: String!): Boolean
      createPassword(password: String!): Boolean
      login(email: String, password: String, authtype: String!): Token
      updateProfile(
          profilePic: String
          firstName: String
          color_scheme: Int
          plan_type: String
          privateProfile: Boolean
      ): Boolean
      makePayment(token: String): Boolean
      createChannel(
          stationName: String
          albumimage: String
          tracks: [Int]
          tracks1: [Int]
          tracks2: [Int]
          tracksH: [Int]
      ): Channel
      updateChannelPlayQueue(
        id: Int
        exploreValue: Int
        freHeart: Int
        freTier1: Int
        freTier2: Int
        freBinoculars: Int
      ): Channel
  }
  type Token {
    token: String
    redirectTo: String
  }
  type Profile {
    id: Int
    firstName: String
    profilePic: String
    color_scheme: Int
    plan_type: String
    private: Boolean
  }
  type User {
    id: Int
    username: String
    password: String
    email: String
    emailotp: String
    facebookauth: String
    googleauth: String
    Profile: Profile
    emailverified: String
  }
  type Channel {
    id: Int
    userid: Int
    stationName: String
    albumimage: String
    tracks: String
    tracks1: String
    tracks2: String
    tracksH: String
    exploreValue: Int
    freHeart: Int
    freTier1: Int
    freTier2: Int
    freBinoculars: Int
    tierHeart: [Track]
    tier1: [Track]
    tier2: [Track]
    tierBinoculars: [Track]
  }
  type Track {
    id: Int
    MnetId: String
    title: String
    name: String
    imgsource: String
    imgsource150: String
    musicsource: String
    artistMnetId: String
    genre: String
    explicitLyrics: String
    releaseDate: String
    bitrate: String
    duration: String
    trackNumber: String
    discNumber: String
    albumMnetId: String
  }
  type Recommendation {
    MnetId: String
    Score: String
  }
`;
