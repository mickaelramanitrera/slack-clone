const faye = require('faye');

module.exports = (strapi) => {
  return {
    async initialize() {
      strapi.services.faye = new faye.Client(
        process.env.REALTIME_SERVER || 'http://realtime:18080/io'
      );
    }
  };
};
