const R = require('react-nexus');
const React = R.React;

const ChatRoom = require('./ChatRoom');
const forkMeImageUrl = 'https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png';

const Root = React.createClass({
  mixins: [R.Root.Mixin],

  render() {
    return <div className='Root'>
      <a href='https://github.com/elierotenberg/react-nexus-chat'><img className='forkMe' src={forkMeImageUrl} alt='Fork me on GitHub' /></a>
      <ChatRoom />
    </div>;
  },

  statics: {
    styles: {
      '.forkMe': {
        position: 'absolute',
        top: 0,
        right: 0,
        border: 0,
      },
    },
  },
});

module.exports = Root;
