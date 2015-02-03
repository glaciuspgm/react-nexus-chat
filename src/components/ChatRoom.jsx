import Nexus from 'react-nexus';
const { React } = Nexus;
import Lifespan from 'lifespan';

import { app } from '../config';
import Messages from './Messages';
import NicknameInput from './NicknameInput';
import MessageInput from './MessageInput';
import Nicknames from './Nicknames';

const { heartbeat } = app;

const ChatRoom = React.createClass({
  mixins: [Nexus.Mixin, Lifespan.Mixin, React.addons.PureRenderMixin],

  getNexusBindings() {
    return {
      nicknames: [this.getNexus().remote, '/nicknames'],
      messages: [this.getNexus().remote, '/messages'],
    };
  },

  componentDidMount() {
    const lifespan = this.getLifespan();
    const heartbeatAction = this.getNexus().remote.Action('/heartbeat', lifespan);
    lifespan.setInterval(() => heartbeatAction.dispatch({}), heartbeat);
  },

  render() {
    const { messages, nicknames } = this.state;
    const myNickname = nicknames ? nicknames.get(this.getNexus().remote.clientHash) : null;
    return <div className='ChatRoom'>
      <div className='ChatRoom-column ChatRoom-leftColumn'>
        <div>
          <Messages messages={messages.toArray()} />
        </div>
        <div>
          { myNickname ? <NicknameInput /> : <MessageInput nickname={myNickname} /> }
        </div>
      </div>
      <div className='ChatRoom-column ChatRoom-rightColumn'>
        <Nicknames nicknames={nicknames.toArray()} />
      </div>
    </div>;
  },

  statics: {
    styles: {
      '.ChatRoom': {
        display: 'block',
      },
      '.ChatRoom-column': {
        display: 'inline-block',
      },
      '.ChatRoom-leftColumn': {
        width: '70%',
      },
      '.ChatRoom-rightColumn': {
        width: '30%',
      },
    },
  },
});

export default ChatRoom;
