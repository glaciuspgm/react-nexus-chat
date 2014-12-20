const R = require('react-nexus');
const React = R.React;

function suffix(s, p) {
  const sp = s.substring(0, p.length);
  if(sp === p) {
    return s.substring(p.length);
  }
  return null;
}

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

module.exports = ChatInput;
