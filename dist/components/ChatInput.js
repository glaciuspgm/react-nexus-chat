"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

function suffix(s, p) {
  var sp = s.substring(0, p.length);
  if (sp === p) {
    return s.substring(p.length);
  }
  return null;
}

var ChatInput = React.createClass({ displayName: "ChatInput",
  mixins: [R.Component.Mixin],

  getInitialState: function () {
    return {
      message: null };
  },

  updateMessage: function (e) {
    this.setState({ message: e.target.value });
  },

  submitForm: function (e) {
    e.preventDefault();
    var message = this.state.message;
    var nickname = suffix(message, "/nick ");
    if (nickname !== null) {
      this.dispatch("uplink://setNickname", { nickname: nickname });
    } else {
      this.dispatch("uplink://setNickname", { message: message });
    }
    this.setState({ message: null });
  },

  render: function () {
    return React.createElement("div", { className: "ChatInput" }, React.createElement("form", { onSubmit: this.submitForm }, React.createElement("div", { className: "ui fluid icon input" }, React.createElement("input", { type: "text", placeholder: "Type your message or /nick <nickname>...", onChange: this.updateMessage }), React.createElement("i", { className: "icon comment" }))));
  } });

module.exports = ChatInput;