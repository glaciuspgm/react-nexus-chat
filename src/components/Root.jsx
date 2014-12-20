const R = require('react-nexus');
const React = R.React;

const ChatRoom = require('./ChatRoom');

const Root = React.createClass({
  mixins: [R.Root.Mixin],

  render() {
    return <div className='Root'>
      <ChatRoom />
    </div>;
  },
});

module.exports = Root;
