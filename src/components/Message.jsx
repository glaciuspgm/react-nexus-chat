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
    const { message, nickname, date } = this.props;
    const d = new Date(date);
    const [h, m, s] = [d.getHours(), d.getMinutes(), d.getSeconds()];
    return <div className='Message'>
      <span className='Message-nickname'>{nickname}</span>
      (<span class='Message-date'>{h}:{m}:{s}</span>)
      <span className='Message-message'>{message}</span>
    </div>;
  },
});

export default Message;
