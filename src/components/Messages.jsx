import Nexus from 'react-nexus';
const { React } = Nexus;

import Message from './Message';

const Messages = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    messages: React.PropTypes.isRequired,
  },

  render() {
    const { messages } = this.props;
    return <ul className='Messages'>
      ( messages ? messages.map(({ message, nickname, date }, key) =>
        <li key={key}>
          <Message message={message} nickname={nickname} date={date} />
        </li>
      ).toArray() : null }
    </ul>;
  },
});

export default Messages;
