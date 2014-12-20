const _ = require('lodash-next');

module.exports = {
  userId(guid) {
    return _.secureHash(guid);
  },

  messageId() {
    return _.uniqueId('message');
  },

  MESSAGE_LIST_MAX_LENGTH: 15,
};
