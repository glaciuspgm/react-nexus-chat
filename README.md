React Nexus Chat
================

Ultra simple chat build with [React Nexus Starterkit](https://github.com/elierotenberg/react-nexus-starterkit.git).

The core code is extremely small. All the rest is either the starterkit boilerplate, or handled by the React Nexus framework.

Here's all the server-side logic (from [uplink.js](https://github.com/elierotenberg/react-nexus-chat/blob/master/src/uplink.js)):

```js
const uplink = new UplinkSimpleServer({
      pid: _.guid('pid'),
      stores: [
        '/userList',
        '/messageList',
      ],
      rooms: [],
      actions: [
        '/postMessage',
        '/setNickname',
      ],
      activityTimeout: 2000,
      app: express().use(cors()),
    });

    const { MESSAGE_LIST_MAX_LENGTH } = chatUtils;
    const UPDATE_THROTTLE = 100;
    const userList = {};
    const messageList = [];

    function catchAll(fn) {
      return function() {
        try {
          return fn.apply(this, arguments);
        }
        catch(err) {
          console.warn(err);
        }
      };
    }

    function render() {
      return {
        '/userList': userList,
        '/messageList': messageList,
      };
    }

    let prevHash = _.hash({});
    function update() {
      const next = render();
      const nextHash = _.hash(next);
      if(nextHash !== prevHash) {
        Object.keys(next).forEach((path) => uplink.update({ path, value: next[path] }));
      }
      prevHash = nextHash;
    }

    setInterval(update, UPDATE_THROTTLE);

    function userJoin({ guid }) {
      guid.should.be.a.String;
      const defaultNickname = _.uniqueId('Anonymous');
      userList[chatUtils.userId(guid)] = defaultNickname;
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] <- ${defaultNickname}`));
      postMessage({ guid, message: `Hello, I'm ${defaultNickname}.`});
    }

    function userLeave({ guid }) {
      guid.should.be.a.String;
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] <- void 0`));
      delete userList[chatUtils.userId(guid)];
    }

    function setNickname({ guid, nickname }) {
      guid.should.be.a.String;
      nickname.should.be.a.String;
      nickname.length.should.be.within(3, 24);
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] <- ${nickname}`));
      userList[chatUtils.userId(guid)] = nickname;
    }

    function postMessage({ guid, message }) {
      message.should.be.a.String;
      message.length.should.be.within(1, 256);
      messageList.push({
        key: chatUtils.messageId(),
        timestamp: Date.now(),
        nickname: userList[chatUtils.userId(guid)],
        userId: chatUtils.userId(guid),
        message
      });
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] -> ${message}`));
      while(messageList.length > MESSAGE_LIST_MAX_LENGTH) {
        messageList.shift();
      }
    }

    uplink.events.on('create', catchAll(userJoin));
    uplink.events.on('delete', catchAll(userLeave));
    uplink.actions.on('/setNickname', catchAll(setNickname));
    uplink.actions.on('/postMessage', catchAll(postMessage));
```

The client-side code is even more trivial, consisting in a few React components, such as [ChatInput.jsx](https://github.com/elierotenberg/react-nexus-chat/blob/master/src/components/ChatInput.jsx):

```js
const ChatInput = React.createClass({
  mixins: [R.Component.Mixin],

  getInitialState() {
    return {
      message: null,
    };
  },

  updateMessage(e) {
    this.setState({ message: e.target.value });
  },

  submitForm(e) {
    e.preventDefault();
    const { message } = this.state;
    const nickname = suffix(message, '/nick ');
    if(nickname !== null) {
      this.dispatch('uplink://setNickname', { nickname });
    }
    else {
      this.dispatch('uplink://postMessage', { message });
    }
    this.setState({ message: null });
  },

  render() {
    return <div className='ChatInput'>
      <form onSubmit={this.submitForm} >
        <div className='ui fluid icon input'>
            <input type='text' placeholder='Type your message or /nick <nickname>...' onChange={this.updateMessage} value={this.state.message} />
            <i className='icon comment' />
        </div>
      </form>
    </div>;
  },
});

```
