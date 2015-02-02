import { React } from 'react-nexus';

const Default = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render() {
    return <div>Page not found.</div>;
  },
});

export default Default;
