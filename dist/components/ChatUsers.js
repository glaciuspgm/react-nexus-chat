"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatUser = require("./ChatUser");
var chatUtils = require("../chatUtils");

var messageHeight = 34;

var ChatUsers = React.createClass({ displayName: "ChatUsers",
  mixins: [R.Component.Mixin],

  getFluxStoreSubscriptions: function () {
    return {
      users: "uplink://userList" };
  },

  render: function () {
    var _this = this;
    return React.createElement("div", { className: "ChatUsers" }, React.createElement("div", { className: "ui list tiny" }, this.state.users ? Object.keys(this.state.users).map(function (userId) {
      return React.createElement(ChatUser, { nickname: _this.state.users[userId], userId: userId, key: userId });
    }) : null));
  },

  statics: {
    style: {
      ".ChatUsers": {
        height: messageHeight * chatUtils.MESSAGE_LIST_MAX_LENGTH },

      ".ChatUsers > ui.list.tiny > .item": {
        height: messageHeight } }
  }
});

module.exports = ChatUsers;