"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

require("6to5/polyfill");
var _ = require("lodash");
var should = require("should");
var Promise = (global || window).Promise = require("bluebird");
var __DEV__ = process.env.NODE_ENV !== "production";
var __PROD__ = !__DEV__;
var __BROWSER__ = typeof window === "object";
var __NODE__ = !__BROWSER__;
if (__DEV__) {
  Promise.longStackTraces();
  Error.stackTraceLimit = Infinity;
}
var Nexus = _interopRequire(require("react-nexus"));

var React = Nexus.React;
var statics = _interopRequire(require("../statics"));

var Nav = _interopRequire(require("./Nav"));

var ChatRoom = _interopRequire(require("./ChatRoom"));

var About = _interopRequire(require("./About"));

var Default = _interopRequire(require("./Default"));

var App = React.createClass({
  displayName: "App",
  mixins: [Nexus.Mixin, React.addons.PureRenderMixin],

  getNexusBindings: function getNexusBindings() {
    return {
      router: [this.getNexus().local, "/router"] };
  },

  render: function render() {
    var router = this.state.router;
    var routes = router ? router.get("routes") : [];
    var _ref = routes[0] || {};
    var title = _ref.title;
    var description = _ref.description;


    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "React Nexus Chat"
      ),
      React.createElement(
        "h2",
        null,
        title
      ),
      React.createElement(
        "h3",
        null,
        description
      ),
      React.createElement(Nav, null),
      title === "Chat room" ? React.createElement(ChatRoom, null) : title === "About" ? React.createElement(About, null) : React.createElement(Default, null),
      React.createElement(Nav, null)
    );
  },

  statics: Object.assign({}, statics, {
    styles: {
      "*": {
        boxSizing: "border-box" } } }) });

module.exports = App;