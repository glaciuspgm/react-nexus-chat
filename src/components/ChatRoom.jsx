const R = require('react-nexus');
const React = R.React;

const ChatMessages = require('./ChatMessages');
const ChatUsers = require('./ChatUsers');
const ChatInput = require('./ChatInput');

const ChatRoom = React.createClass({
  mixins: [R.Component.Mixin],

  render() {
    return <div className='ChatRoom ui page grid'>
      <div className='ChatRoom-Header row'>
        <div className='column'>
          <h2 className='ui header'>
            <i className='lab icon' />
            <div className='content'>
              React Nexus Chat
              <div className='sub header'>Because a little demo tells more than a big README.</div>
            </div>
          </h2>
        </div>
      </div>
      <div className='row'>
        <div className='ChatRoom-ChatMessages ten wide column'>
          <ChatMessages />
          <ChatInput />
        </div>
        <div className='ChatRoom-ChatUsers three wide column'>
          <ChatUsers />
        </div>
      </div>
    </div>;
  },

  statics: {
    styles: {
      '.ChatRoom-Header.row': {
        marginTop: '1rem',
      },
    },
  },
});

module.exports = ChatRoom;
