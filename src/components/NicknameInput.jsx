import Nexus from 'react-nexus';
import Lifespan from 'lifespan';
const { React } = Nexus;

import { app } from '../config';
const { nicknameLength } = app;

const NicknameInput = React.createClass({
  mixins: [Nexus.Mixin, Lifespan.Mixin, React.addons.PureRenderMixin],

  getInitialState() {
    return {
      input: '',
      disabled: false,
    };
  },

  setNicknameAction: null,

  componentDidMount() {
    this.setNicknameAction = this.getNexus().remote.Action('/setNickname', this.getLifespan());
  },

  updateInput(ev) {
    const input = ev.target.value;
    if(this.state.disabled) {
      return;
    }
    if(input.length > nicknameLength) {
      return;
    }
    this.setState({ input });
  },

  submitForm(ev) {
    ev.preventDefault();
    if(this.state.disabled) {
      return;
    }
    this.setState({ disabled: true });
    this._setNickname.dispatch({ nickname: this.state.input });
  },

  render() {
    return <form className='NicknameInput' onSubmit={this.submitForm}>
      <label>Enter your nickname</label>
      <input type='text' onChange={this.updateInput} value={this.state.input} disabled={this.state.disabled} />
    </form>
  },

});

export default NicknameInput;
