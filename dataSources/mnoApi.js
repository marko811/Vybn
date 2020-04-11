const crypto = require('crypto');

const { RESTDataSource } = require('apollo-datasource-rest');

const SHARED_SECRET = 'Lbt6wH5elj0';

const getSignature = (queryString) => {
  const hmac = crypto.createHmac('md5', SHARED_SECRET);
  return hmac.update(queryString).digest('hex');
}

const paramsToString = (params) => params && Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');

class MnoApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.mndigital.com/';
  }

  async getArtistRecs(mnetids) {
    if (!mnetids) return [];
    const data = await this.get('', {
      method: 'Artist.GetRecommendations',
      format: 'json',
      mnetids: mnetids.toString,
      numRecommendations: 100,
      apiKey: 'aGTrhbeubSEus5FXORMhhJgtW',
      // timestamp: 1585690529,
      signature: getSignature(mnetids),
    });
    return data.results;
  }

  async getTrackRecs(mnetids) {
    if (!mnetids) return [];
    const qParams = {
      method: 'Track.GetRecommendations',
      format: 'json',
      mnetids: mnetids.toString(),
      numRecommendations: 500,  // TODO: paramaterize
      includeExplicit: "True",
      apiKey: 'aGTrhbeubSEus5FXORMhhJgtW', // TODO: move to config
    };
    console.log('qParams');
    console.log(qParams);
    const { RecommendationSets } = await this.get('', {
      ...qParams,
      signature: getSignature(paramsToString(qParams)),
    });
    return RecommendationSets || [];
  }
}

module.exports = {
  MnoApi,
}