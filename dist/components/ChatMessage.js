"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatMessage = React.createClass({ displayName: "ChatMessage",
  mixins: [R.Component.Mixin],

  propTypes: {
    timestamp: React.PropTypes.number.isRequired,
    nickname: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired },

  getTime: function () {
    var d = new Date(this.props.timestamp);
    var h = (h < 10 ? "0" : "") + d.getHours();
    var i = (i < 10 ? "0" : "") + d.getMinutes();
    var s = (s < 10 ? "0" : "") + d.getSeconds();
    return "" + h + ":" + i + ":" + s;
  },

  render: function () {
    return React.createElement("div", { className: "ChatMessage item" }, React.createElement("img", { className: "ui avatar image", src: "http://api.adorable.io/avatars/" + this.props.userId }), React.createElement("div", { className: "content" }, React.createElement("a", { className: "header" }, this.props.nickname, " (", this.getTime(), ")"), React.createElement("div", { className: "description" }, this.props.message)));
  },

  statics: {
    styles: {
      ".ChatMessage.item:last-child": {
        paddingBottom: "0.3em" } } } });

module.exports = ChatMessage;