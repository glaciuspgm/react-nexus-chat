import Nexus from 'react-nexus';
const { React } = Nexus;

const Nicknames = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    nicknames: React.PropTypes.array.isRequired,
  },

  render() {
    const { nicknames } = this.props;
    return <ul className='Nicknames'>
      { nicknames ? nicknames.sort((a, b) => a.localCompare(b)).map((nickname, key) =>
        <li key={key}>{ nickname }</li>
      ): null }
    </ul>;
  }
});

export default Nicknames;
