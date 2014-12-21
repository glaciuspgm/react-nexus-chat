"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var _ = R._;
var cors = require("cors");
var express = require("express");
var UplinkSimpleServer = require("nexus-uplink-simple-server");
var DirtyMarker = UplinkSimpleServer.DirtyMarker;


var chatUtils = require("./chatUtils");

module.exports = function () {
  var uplink = new UplinkSimpleServer({
    pid: _.guid("pid"),
    stores: ["/userList", "/messageList"],
    rooms: [],
    actions: ["/postMessage", "/setNickname"],
    activityTimeout: 2000,
    app: express().use(cors()) });

  var MESSAGE_LIST_MAX_LENGTH = chatUtils.MESSAGE_LIST_MAX_LENGTH;
  var UPDATE_INTERVAL = 100;
  var dirty = new DirtyMarker();
  var store = {
    "/userList": {},
    "/messageList": [] };

  function update() {
    dirty.flush().forEach(function (path) {
      return uplink.update({ path: path, value: store[path] });
    });
  }

  setInterval(update, UPDATE_INTERVAL);

  function catchAll(fn) {
    return function () {
      try {
        return fn.apply(this, arguments);
      } catch (err) {
        console.warn(err);
      }
    };
  }

  function userJoin(_ref) {
    var guid = _ref.guid;
    guid.should.be.a.String;
    var defaultNickname = _.uniqueId("Anonymous");
    store["/userList"][chatUtils.userId(guid)] = defaultNickname;
    _.dev(function () {
      return console.log("store['/userList'][" + chatUtils.userId(guid) + "] <- " + defaultNickname);
    });
    postMessage({ guid: guid, message: "Hello, I'm " + defaultNickname + "." });
    dirty.mark("/userList");
  }

  function userLeave(_ref2) {
    var guid = _ref2.guid;
    guid.should.be.a.String;
    _.dev(function () {
      return console.log("store['/userList'][" + chatUtils.userId(guid) + "] <- void 0");
    });
    delete store["/userList"][chatUtils.userId(guid)];
    dirty.mark("/userList");
  }

  function setNickname(_ref3) {
    var guid = _ref3.guid;
    var nickname = _ref3.nickname;
    guid.should.be.a.String;
    nickname.should.be.a.String;
    nickname.length.should.be.within(3, 24);
    _.dev(function () {
      return console.log("store['/userList'][" + chatUtils.userId(guid) + "] <- " + nickname);
    });
    store["/userList"][chatUtils.userId(guid)] = nickname;
    dirty.mark("/userList");
  }

  function postMessage(_ref4) {
    var guid = _ref4.guid;
    var message = _ref4.message;
    message.should.be.a.String;
    message.length.should.be.within(1, 256);
    store["/messageList"].push({
      key: chatUtils.messageId(),
      timestamp: Date.now(),
      nickname: store["/userList"][chatUtils.userId(guid)],
      userId: chatUtils.userId(guid),
      message: message
    });
    _.dev(function () {
      return console.log("store['/userList'][" + chatUtils.userId(guid) + "] -> " + message);
    });
    while (store["/messageList"].length > MESSAGE_LIST_MAX_LENGTH) {
      store["/messageList"].shift();
    }
    dirty.mark("/messageList");
  }

  uplink.events.on("create", catchAll(userJoin));
  uplink.events.on("delete", catchAll(userLeave));
  uplink.actions.on("/setNickname", catchAll(setNickname));
  uplink.actions.on("/postMessage", catchAll(postMessage));

  return uplink;
};