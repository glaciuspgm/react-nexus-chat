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
var Message = _interopRequire(require("./Message"));

var Messages = React.createClass({
  displayName: "Messages",
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    messages: React.PropTypes.isRequired },

  render: function render() {
    var messages = this.props.messages;
    return React.createElement(
      "ul",
      { className: "Messages" },
      "( messages ? messages.map((",
      (message, nickname, date),
      ", key) =>",
      React.createElement(
        "li",
        { key: key },
        React.createElement(Message, { message: message, nickname: nickname, date: date })
      ),
      ").toArray() : null }"
    );
  } });

module.exports = Messages;