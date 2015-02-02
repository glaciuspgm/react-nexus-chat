import Nexus from 'react-nexus';
const { React } = Nexus;

const Message = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    message: React.PropTypes.string.isRequired,
    nickname: React.PropTypes.string.isRequired,
    date: React.PropTypes.number.isRequired,
  },

  render() {
    const date = new Date(this.props.date);
    const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    return <div className='Message'>
      <span className='Message-nickname'>{nickname}</span>
      (<span class='Message-date'>{h}:{m}:{s}</span>)
      <span className='Message-message'>{message}</span>
    </div>;
  },
});

export default Message;
