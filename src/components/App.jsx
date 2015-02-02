import Nexus from 'react-nexus';
const { React } = Nexus;

import statics from '../statics';
import Nav from './Nav';
import ChatRoom from './ChatRoom';
import About from './About';
import Default from './Default';

const App = React.createClass({
  mixins: [Nexus.Mixin, React.addons.PureRenderMixin],

  getNexusBindings() {
    return {
      router: [this.getNexus().local, '/router'],
    };
  },

  render() {
    const { router } = this.state;
    const routes = router ? router.get('routes') : [];
    const { title, description } = routes[0] || {};

    return <div>
      <h1>React Nexus Chat</h1>
      <h2>{ title }</h2>
      <h3>{ description }</h3>
      <Nav />
      {
        title === 'Chat room' ? <ChatRoom /> :
        title === 'About' ? <About /> :
        <Default />
      }
      <Nav />
    </div>;
  },

  statics: Object.assign({}, statics, {
    styles: {
      '*': {
        boxSizing: 'border-box',
      },
    },
  }),
});

export default App;
