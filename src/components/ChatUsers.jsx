const R = require('react-nexus');
const React = R.React;

const ChatUser = require('./ChatUser');
const chatUtils = require('../chatUtils');

const messageHeight = 34;

const ChatUsers = React.createClass({
  mixins: [R.Component.Mixin],

  getFluxStoreSubscriptions() {
    return {
      'users': 'uplink://userList',
    };
  },

  render() {
    return <div className='ChatUsers'><div className='ui list tiny'>
    { this.state.users ?
      Object.keys(this.state.users).map((userId) =>
        <ChatUser nickname={this.state.users[userId]} userId={userId} key={userId} />
      ) : null }
    </div></div>;
  },

  statics: {
    style: {
      '.ChatUsers': {
        height: messageHeight * chatUtils.MESSAGE_LIST_MAX_LENGTH,
      },

      '.ChatUsers > ui.list.tiny > .item': {
        height: messageHeight,
      },

    }
  }
});

module.exports = ChatUsers;
