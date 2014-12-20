"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatRoom = require("./ChatRoom");
var forkMeImageUrl = "https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png";

var Root = React.createClass({ displayName: "Root",
  mixins: [R.Root.Mixin],

  render: function () {
    return React.createElement("div", { className: "Root" }, React.createElement("a", { href: "https://github.com/elierotenberg/react-nexus-chat" }, React.createElement("img", { className: "forkMe", src: forkMeImageUrl, alt: "Fork me on GitHub" })), React.createElement(ChatRoom, null));
  },

  statics: {
    styles: {
      ".forkMe": {
        position: "absolute",
        top: 0,
        right: 0,
        border: 0 } } } });

module.exports = Root;