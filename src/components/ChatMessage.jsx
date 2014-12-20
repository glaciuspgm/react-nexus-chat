const R = require('react-nexus');
const React = R.React;

const ChatMessage = React.createClass({
  mixins: [R.Component.Mixin],

  propTypes: {
    timestamp: React.PropTypes.number.isRequired,
    nickname: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
  },

  getTime() {
    const d = new Date(this.props.timestamp);
    const h = (h < 10 ? '0' : '') + d.getHours();
    const i = (i < 10 ? '0' : '') + d.getMinutes();
    const s = (s < 10 ? '0' : '') + d.getSeconds();
    return `${h}:${i}:${s}`;
  },

  render() {
    return <div className='ChatMessage item'>
      <img className='ui avatar image' src={'http://api.adorable.io/avatars/' + this.props.userId} />
      <div className='content'>
        <a className='header'>{this.props.nickname} ({this.getTime()})</a>
        <div className='description'>{this.props.message}</div>
      </div>
    </div>;
  },

  statics: {
    styles: {
      '.ChatMessage.item:last-child': {
        paddingBottom: '0.3em',
      },
    },
  },
});

module.exports = ChatMessage;
