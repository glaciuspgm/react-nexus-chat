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


var Nicknames = React.createClass({
  displayName: "Nicknames",
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    nicknames: React.PropTypes.isRequired },

  render: function render() {
    var nicknames = this.props.nicknames;
    return React.createElement(
      "ul",
      { className: "Nicknames" },
      nicknames ? nicknames.sort(function (a, b) {
        return a.localCompare(b);
      }).map(function (nickname, key) {
        return React.createElement(
          "li",
          { key: key },
          nickname
        );
      }).toArray() : null
    );
  }
});

module.exports = Nicknames;