const { filter, flatten, map, union, differenceWith } = require("ramda");
const Sequelize = require("sequelize");

const { Channel, ChannelComponent, Component, ComponentRecommendation, Track } = require("../models");

// TODO: add configuration layer for app and store value there
const TIER1_COMP_GOAL = 100;
const TIER2_COMP_GOAL = 200;
const TIERBINOCS_COMP_GOAL = 300;

const channelTrackBuilder = (channelId, tierNum) => (compId) => ({compId, channelId, tierNum});

const loadTier = (tierNum) => async (parent) => {
  // console.log('parent');
  // console.log(parent);
  const tierTrackInstances = await ChannelComponent.findAll({
    attributes: ['compId'],
    where: {
      channelId: parent.id,
      tierNum
    },
    include: [{ model: Component, as: 'component' }] 
  });
  tierComps = filter(intance => intance.component, tierTrackInstances);
  tier = map(({component: {Id, Title, Isrc, Duration}}) =>({MnetId: Id, title: Title, name: '', imgsource: '', imgsource150: '', duration: Duration}), tierComps);
  console.log('tier');
  console.log(tier);
  return tier;
};

const getTrackRecsForTier = async (dataSources, goal, accRecsIn, accNewRecsIn, recsIn) => {
  if (recsIn.length === 0) return [accRecsIn, accNewRecsIn];
  const localRecsInstances = await ComponentRecommendation.findAll({ attributes: ['recCompId'], where: { compId: { $in: recsIn } } });
  const localRecs = map(({ recCompId }) => recCompId, localRecsInstances);
  // console.log(localRecs);
  /* if we need more, find recs for tracks from API */
  const apiRecs = localRecs.length < goal ? await dataSources.mnoApi.getTrackRecs(recsIn) : [];
  // console.log(apiRecs);
  // Score * 1000 stores our score as an int in db
  const zipRecs = (compId) => ({ MnetId, Score }) => ({ compId, recCompId: parseInt(MnetId, 10), score: Score * 1000 });
  const apiRecsList = flatten(map(({ RecommendedEntities, MnetId }) => map(zipRecs(MnetId), RecommendedEntities), apiRecs));
  // console.log(apiRecsList);
  const apiRecIds = map(({ recCompId }) => recCompId, apiRecsList);
  // console.log(apiRecIds);
  /* consolidate local and api recs */
  const consRecIds = union(localRecs, apiRecIds);
  const compareRecToRecId = (rec, recId) => rec.recCompId === recId;
  const newRecs = differenceWith(compareRecToRecId, apiRecsList, localRecs);
  // console.log(consRecIds);
  // console.log(newRecs);
  const accRecs = [...accRecsIn, ...consRecIds];
  const accNewRecs = [...accNewRecsIn, ...newRecs];
  console.log('accRecs count');
  console.log(accRecs.length);
  if (accRecs.length >= goal) return [accRecs, accNewRecs];
  return getTrackRecsForTier(dataSources, goal, accRecs, accNewRecs, consRecIds);
}

module.exports = {
  Query: {
    mychannels: async (parent, args, context, info) => {
      const channels = await Channel.findAll({ where: { userid: context.user.id } });
      return channels;
    },
    randomTrack: async (parent, args) => {
      const total = await Track.findAll({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']]
      });
      const count = total[0].dataValues.count;
      
      if (count == 0) {
        throw new Error("No tracks exist.");
      }
      const num = Math.floor(args.position * count);

      console.log('total count: ', count);
      console.log('track num: ', num);
      
      const tracks = await Track.findAll({
        offset: num, limit: 1
      });
      return tracks[0];
    },
  },

  Mutation: {
    createChannel: async (
      parent,
      { stationName, albumimage, tracks, tracks1, tracks2, tracksH},
      { user, dataSources }
    ) => {
      console.log(tracks);
      if (!user.id) throw new Error("Login to create channel");
      if (!tracks || !Array.isArray(tracks)) throw new Error("Track list required to create channel");

      const userid = user.id;
      // const [consRecIds, newRecs] = await getTrackRecsForTier(dataSources, TIER1_COMP_GOAL, [], [], tracks);
      
      const channel = {
        userid,
        stationName,
        albumimage,
        freHeart: tracks.length,
        freTier1: tracks1.length,
        freTier2: tracks2.length,
        freBinoculars: tracksH.length,
        tracks: tracks.join(),
        tracks1: tracks1.join(),
        tracks2: tracks2.join(),
        tracksH: tracksH.join()
      };
      
      console.log(channel);
      const channelInstance = await Channel.create(channel);
      
      /* tracks selected by the user make up tier heart */
      // const thierHeartChannelTrackList = map(channelTrackBuilder(channelInstance.id, 0), tracks);

      /* recommendations until our tier goal is met make up next tier */
      // const tierOneChannelTrackList = map(channelTrackBuilder(channelInstance.id, 1), consRecIds);

      // const channelTrackList = [...thierHeartChannelTrackList, ...tierOneChannelTrackList];

      // the channel should have tier one and two populated before we send it back to client 
      // (so that they may begin playing the channel)
      // await ChannelComponent.bulkCreate(channelTrackList);

      // intentional fire and forget -- we don't want the user to wait for tiers 3 and 4 before they get there channel returned
      // getTrackRecsForTier(dataSources, TIER2_COMP_GOAL, [], [], consRecIds)
      //   .then(([tier2Comps, tier2NewRecs]) => [map(channelTrackBuilder(channelInstance.id, 2), tier2Comps), tier2Comps, tier2NewRecs])
      //   .then(([tier2TrackList, tier2Comps, tier2NewRecs]) => { 
      //     ChannelComponent.bulkCreate(tier2TrackList);
      //     return [tier2Comps, tier2NewRecs];
      //   })
        // The code below would load the binocular tier, but as is it sends too large of a request to the MNO API, this would 
        // need to be broken up into smaller requests to the API
        // .then(([tier2Comps, tier2NewRecs]) => getTrackRecsForTier(dataSources, TIERBINOCS_COMP_GOAL, [], [tier2NewRecs], tier2Comps))
        // .then(([tierBinocsComps, accNewRecs]) => [map(channelTrackBuilder(channelInstance.id, 3), tierBinocsComps), accNewRecs])
        // .then(([tierBinocsTrackList, accNewRecs]) => { 
        //   ChannelComponent.bulkCreate(tierBinocsTrackList);
        //   return accNewRecs;
        // })
        // .then(accNewRecs => ComponentRecommendation.bulkCreate(accNewRecs))
        // .catch(e => console.error(`Error occured when writing recommendations and tiers to db: ${e.message}`))

      /* the recs we get from the API, should be stored in our DB, so we will not have to retrieve them next time */
      // intentional fire and forget -- this is to update the DB for future channel creation, so not needed now
      // ComponentRecommendation.bulkCreate(newRecs).catch(e => console.error(`Error occured when writing recommendations to db: ${e.message}`));

      return ;
    },
    updateChannelPlayQueue: async (
      parent,
      { id, exploreValue, freHeart, freTier1, freTier2, freBinoculars },
      context
    ) => {
      if (!context.user.id) throw new Error("Login to update channel");
      
      const channel = await Channel.findByPk(id);
      if (!channel) throw new Error("Channel with the given id doesn't exist");

      channel.exploreValue = exploreValue;
      channel.freHeart = freHeart;
      channel.freTier1 = freTier1;
      channel.freTier2 = freTier2;
      channel.freBinoculars = freBinoculars;

      await channel.save();
      
      return channel;
    },
  },

  Channel: {
    // tierHeart: loadTier(0),
    // tier1: loadTier(1),
    // tier2: loadTier(2),
    // tierBinoculars: loadTier(3),
      // tierBinoculars: async (parent) => {
    //   const channelTracks = await ChannelTrack.findAll({
    //     where: {
    //       channelId: parent.id,
    //       tierNum: 3
    //     },
    //     include: [{ model: Track, as: 'track' }]
    //   });
    //   return channelTracks.map(track => track.track);
    // }
  }
};
