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


var Message = React.createClass({
  displayName: "Message",
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    message: React.PropTypes.string.isRequired,
    nickname: React.PropTypes.string.isRequired,
    date: React.PropTypes.number.isRequired },

  render: function render() {
    var message = this.props.message;
    var nickname = this.props.nickname;
    var date = this.props.date;
    var d = new Date(date);
    var _ref = [d.getHours(), d.getMinutes(), d.getSeconds()];

    var h = _ref[0];
    var m = _ref[1];
    var s = _ref[2];
    return React.createElement(
      "div",
      { className: "Message" },
      React.createElement(
        "span",
        { className: "Message-nickname" },
        nickname
      ),
      "(",
      React.createElement(
        "span",
        { "class": "Message-date" },
        h,
        ":",
        m,
        ":",
        s
      ),
      ")",
      React.createElement(
        "span",
        { className: "Message-message" },
        message
      )
    );
  } });

module.exports = Message;