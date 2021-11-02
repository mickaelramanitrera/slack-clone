'use strict';

/**
 * Lifecycle callbacks for the `User` model.
 */

module.exports = {
 lifecycles: {
    // Called before an entry is created
    afterCreate: async (data) => {
      // Create own direct channel
      strapi.query('channels').create({
        name: data.username,
        description: 'My own channel',
        type: 'direct',
        owner: data.id,
        members: [
          data.id
        ]
      });
      
      // Create direct channel with others
      const otherUsers = await strapi.query('user', 'users-permissions').find({id_nin: [data.id]});
      
      if (Array.isArray(otherUsers) && otherUsers.length) {
        otherUsers.forEach((user) => {
          strapi.query('channels').create({
            name: data.username,
            description: `Direct channel with ${user.username}`,
            type: 'direct',
            owner: data.id,
            members: [
              data.id,
              user.id
            ]
          });
        });
      }
    },
 }
};