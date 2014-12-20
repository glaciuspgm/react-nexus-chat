"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatUser = React.createClass({ displayName: "ChatUser",
  mixins: [R.Component.Mixin],

  propTypes: {
    nickname: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired },

  render: function () {
    return React.createElement("div", { className: "ChatUser item" }, React.createElement("img", { className: "ui avatar image", src: "http://api.adorable.io/avatars/" + this.props.userId }), React.createElement("div", { className: "content" }, React.createElement("a", { className: "header" }, this.props.nickname)));
  } });

module.exports = ChatUser;