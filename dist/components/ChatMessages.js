"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatMessage = require("./ChatMessage");
var styles = require("../styles");
var chatUtils = require("../chatUtils");

var ChatMessages = React.createClass({ displayName: "ChatMessages",
  mixins: [R.Component.Mixin],

  getFluxStoreSubscriptions: function () {
    return {
      messages: "uplink://messageList" };
  },

  render: function () {
    var _this = this;
    return React.createElement("div", { className: "ChatMessages" }, React.createElement("div", { className: "ui list tiny" }, this.state.messages ? Object.keys(this.state.messages).map(function (k) {
      return React.createElement(ChatMessage, React.__spread({}, _this.state.messages[k]));
    }) : null));
  },

  statics: {
    styles: {
      ".ChatMessages": {
        height: styles.dimensions.chatMessageHeight * chatUtils.MESSAGE_LIST_MAX_LENGTH } } } });

module.exports = ChatMessages;