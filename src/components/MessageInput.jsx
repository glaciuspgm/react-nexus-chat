import Nexus from 'react-nexus';
const { React } = Nexus;

import { app } from '../config';
const { messageLength } = app;

const MessageInput = React.createClass({
  mixins: [React.addons.PureRenderMixin, Nexus.Mixin, Lifespan.Mixin],
  propTypes: {
    nickname: React.PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      input: '',
    };
  },

  componentDidMount() {
    this._postMessage = this.getNexus().remote.Action('/postMessage', this.getLifespan());
  },

  submitForm(ev) {
    ev.preventDefault();
    this._postMessage.dispatch({ message: this.state.input });
    this.setState({ input: '' });
  },

  updateInput(ev) {
    const input = ev.target.value;
    if(input > messageLength) {
      return;
    }
    this.setState({ input });
  },

  render() {
    return <form className='MessageInput' onSubmit={this.submitForm}>
      <label>{this.props.nickname}</label>
      <input type='text' onChange={this.updateInput} value={this.state.input} />
    </form>
  }
});

export default MessageInput;
