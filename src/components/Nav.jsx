import { React } from 'react-nexus';
import Link from './Link';

const Nav = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render() {
    return <ul className='Nav'>
      <li key='chatroom'><Link href={'/'}>Chat room</Link></li>
      <li key='about'><Link href={'/about'}>About</Link></li>
    </ul>;
  },

  statics: {
    styles: {
      '.Nav': {
        'padding': '5px',
      },
      '.Nav > li': {
        'display': 'inline-block',
      },
    },
  },
});

export default Nav;
