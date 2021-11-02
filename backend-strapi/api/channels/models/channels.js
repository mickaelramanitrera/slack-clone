'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate: async (model, ctx) => {
      const channelId = model.id;

      strapi.services.faye.publish(`/channel/${channelId}`, {
        type: 'new',
        id: model.id,
        data: model,
      });
    },
  }
};
