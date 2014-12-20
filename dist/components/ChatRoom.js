"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatMessages = require("./ChatMessages");
var ChatUsers = require("./ChatUsers");
var ChatInput = require("./ChatInput");

var ChatRoom = React.createClass({ displayName: "ChatRoom",
  mixins: [R.Component.Mixin],

  render: function () {
    return React.createElement("div", { className: "ChatRoom ui page grid" }, React.createElement("div", { className: "ChatRoom-Header row" }, React.createElement("div", { className: "column" }, React.createElement("h2", { className: "ui header" }, React.createElement("i", { className: "lab icon" }), React.createElement("div", { className: "content" }, "React Nexus Chat", React.createElement("div", { className: "sub header" }, "Because a little demo tells more than a big README."))))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "ChatRoom-ChatMessages ten wide column" }, React.createElement(ChatMessages, null), React.createElement(ChatInput, null)), React.createElement("div", { className: "ChatRoom-ChatUsers three wide column" }, React.createElement(ChatUsers, null))));
  },

  statics: {
    styles: {
      ".ChatRoom-Header.row": {
        marginTop: "1rem" } } } });

module.exports = ChatRoom;