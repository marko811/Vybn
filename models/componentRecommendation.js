const ComponentRecommendationModel = (sequelize, type) => {
  return sequelize.define("ComponentRecommendation", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    compId: {
      type: type.INTEGER
    },
    recCompId: {
      type: type.INTEGER
    },
    score: {
      type: type.INTEGER
    }
  });
};

module.exports = {
  ComponentRecommendationModel
};
