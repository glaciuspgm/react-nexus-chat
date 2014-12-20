const R = require('react-nexus');
const React = R.React;

const ChatMessage = require('./ChatMessage');
const styles = require('../styles');
const chatUtils = require('../chatUtils');

const ChatMessages = React.createClass({
  mixins: [R.Component.Mixin],

  getFluxStoreSubscriptions() {
    return {
      "messages": "uplink://messageList",
    };
  },

  render() {
    return <div className='ChatMessages'><div className='ui list tiny'>
      { this.state.messages ? Object.keys(this.state.messages).map((k) =>
        <ChatMessage {...this.state.messages[k]} />
      ) : null }
    </div></div>;
  },

  statics: {
    styles: {
      '.ChatMessages': {
        height: styles.dimensions.chatMessageHeight * chatUtils.MESSAGE_LIST_MAX_LENGTH,
      },
    },
  },
});

module.exports = ChatMessages;
