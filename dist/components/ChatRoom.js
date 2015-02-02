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
var heartbeat = app.heartbeat;
var messageLength = app.messageLength;
var nicknameLength = app.nicknameLength;


var ChatRoom = React.createClass({
  displayName: "ChatRoom",
  mixins: [Nexus.Mixin, Lifespan.Mixin],

  getInitialState: function getInitialState() {
    return {
      input: "" };
  },

  getNexusBindings: function getNexusBindings() {
    return {
      nicknames: [this.getNexus().remote, "/nicknames"],
      messages: [this.getNexus().remote, "/messages"] };
  },

  _heartbeat: null,
  _postMessage: null,
  _setNickname: null,

  componentDidMount: function componentDidMount() {
    var _this = this;
    var lifespan = this.getLifespan();
    var remote = this.getNexus().remote;
    this._heartbeat = remote.Action("/heartbeat", lifespan);
    this._postMessage = remote.Action("/postMessage", lifespan);
    this._setNickname = remote.Action("/setNickname", lifespan);
    lifespan.setInterval(function () {
      return _this._heartbeat.dispatch({});
    }, heartbeat);
  },

  updateInput: function updateInput(ev) {
    var input = ev.target.value;
    if (_.startsWith(input, "/nick")) {
      var nickname = _.words(input)[1];
      if (nickname !== void 0 && nickname.length > nicknameLength) {
        return;
      }
    } else {
      if (input.length > messageLength) {
        return;
      }
    }
    this.setState({ input: input });
  },

  submitInput: function submitInput(ev) {
    ev.preventDefault();
    var input = this.state.input;
    if (_.startsWith(input, "/nick")) {
      var nickname = _.words(input)[1];
      this._setNickname.dispatch({ nickname: nickname });
    } else {
      this._postMessage.dispatch({ message: this.state.input });
    }
    this.setState({ input: "" });
  },

  render: function render() {
    var messages = this.state.messages;
    var nicknames = this.state.nicknames;
    var input = this.state.input;
    var myNickname = nicknames ? nicknames.get(this.getNexus().remote.clientHash) : null;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        React.createElement(
          "ul",
          { className: "ChatRoom-messages" },
          messages ? messages.map(function (_ref, key) {
            var date = _ref.date;
            var nickname = _ref.nickname;
            var message = _ref.message;
            return React.createElement(
              "li",
              { key: key },
              JSON.stringify({ date: date, nickname: nickname, message: message })
            );
          }).toArray() : null
        ),
        React.createElement(
          "form",
          { className: "ChatRoom-input", onSubmit: this.submitInput },
          myNickname || "Anonymous",
          ":",
          React.createElement("input", { type: "text", onChange: this.updateInput, value: input })
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "ul",
          { className: "ChatRoom-nicknames" },
          nicknames ? nicknames.map(function (nickname, clientHash) {
            return React.createElement(
              "li",
              { key: clientHash },
              JSON.stringify({ nickname: nickname, clientHash: clientHash })
            );
          }).toArray() : null
        )
      )
    );
  } });

module.exports = ChatRoom;