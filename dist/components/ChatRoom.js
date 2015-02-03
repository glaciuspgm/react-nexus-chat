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
var Lifespan = _interopRequire(require("lifespan"));

var app = require("../config").app;
var Messages = _interopRequire(require("./Messages"));

var NicknameInput = _interopRequire(require("./NicknameInput"));

var MessageInput = _interopRequire(require("./MessageInput"));

var Nicknames = _interopRequire(require("./Nicknames"));

var heartbeat = app.heartbeat;


var ChatRoom = React.createClass({
  displayName: "ChatRoom",
  mixins: [Nexus.Mixin, Lifespan.Mixin, React.addons.PureRenderMixin],

  getNexusBindings: function getNexusBindings() {
    return {
      nicknames: [this.getNexus().remote, "/nicknames"],
      messages: [this.getNexus().remote, "/messages"] };
  },

  componentDidMount: function componentDidMount() {
    var lifespan = this.getLifespan();
    var heartbeatAction = this.getNexus().remote.Action("/heartbeat", lifespan);
    lifespan.setInterval(function () {
      return heartbeatAction.dispatch({});
    }, heartbeat);
  },

  render: function render() {
    var messages = this.state.messages;
    var nicknames = this.state.nicknames;
    var myNickname = nicknames ? nicknames.get(this.getNexus().remote.clientHash) : null;
    return React.createElement(
      "div",
      { className: "ChatRoom" },
      React.createElement(
        "div",
        { className: "ChatRoom-column ChatRoom-leftColumn" },
        React.createElement(
          "div",
          null,
          React.createElement(Messages, { messages: messages.toArray() })
        ),
        React.createElement(
          "div",
          null,
          myNickname ? React.createElement(NicknameInput, null) : React.createElement(MessageInput, { nickname: myNickname })
        )
      ),
      React.createElement(
        "div",
        { className: "ChatRoom-column ChatRoom-rightColumn" },
        React.createElement(Nicknames, { nicknames: nicknames.toArray() })
      )
    );
  },

  statics: {
    styles: {
      ".ChatRoom": {
        display: "block" },
      ".ChatRoom-column": {
        display: "inline-block" },
      ".ChatRoom-leftColumn": {
        width: "70%" },
      ".ChatRoom-rightColumn": {
        width: "30%" } } } });

module.exports = ChatRoom;