const { ApolloServer, gql } = require("apollo-server-express");
const { createTestClient } = require('apollo-server-testing');

const { MnoApi } = require('../dataSources/mnoApi');
const resolvers = require("../resolvers");
const typeDefs = require("../typedefs");

const CREATE_CHANNEL = gql`
   mutation($stationName: String, $albumimage: String, $tracks: [Int], $tracks1: [Int], $tracks2: [Int], $tracksH: [Int]) {
    createChannel(stationName: $stationName, albumimage: $albumimage, tracks: $tracks, tracks1: $tracks1, tracks2: $tracks2, tracksH: $tracksH){
      id
      userid
      stationName
      albumimage
      tracks
      exploreValue
      freHeart
      freTier1
      freTier2
      freBinoculars
      tierHeart {
        MnetId
        title
        name
        imgsource
        imgsource150
        duration
      }
      tier1 {
        MnetId
        title
        name
        imgsource
        imgsource150
        duration
      }
    }
  }
`;

it('create channel returns correct tracks', async () => {
  const mnoApi = new MnoApi();

  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ mnoApi }),
    context: () => ({ user: { id: 1, email: 'henry@testing.com' } }),
  });

  // mock the dataSource's underlying fetch methods
//   mnoApi.get = jest.fn(() => []);

  // use the test server to create a mutate function
  const { mutate } = createTestClient(server);

  const stationName = "integration test 1";
//   const { data: { createChannel }, errors} = await mutate({ mutation: CREATE_CHANNEL, variables: { stationName, albumimage: "", tracks: [410811587]} });
  const { data, errors} = await mutate({ mutation: CREATE_CHANNEL, variables: { stationName, albumimage: "", tracks: [424256195]} });
  console.log(errors);
  const { createChannel } = data;
  console.log(data);
  console.log(createChannel.tier1);
  const { stationName: newStationName } = createChannel;
  expect(newStationName).toBe(stationName);
  // Note: the createChannel intentionally has un-awaited promises, so the warnings from Jest about 
  // "Jest did not exit one second after the test run has completed." can be ignored.
});