const R = require('react-nexus');
const React = R.React;

const ChatUser = React.createClass({
  mixins: [R.Component.Mixin],

  propTypes: {
    nickname: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
  },

  render() {
    return <div className='ChatUser item'>
      <img className='ui avatar image' src={'http://api.adorable.io/avatars/' + this.props.userId} />
      <div className='content'>
        <a className='header'>{this.props.nickname}</a>
      </div>
    </div>;
  },
});

module.exports = ChatUser;
