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
var RemoteFluxServer = _interopRequire(require("nexus-flux-socket.io/server"));

var _config = require("./config");

var flux = _config.flux;
var app = _config.app;
var port = flux.port;
var heartbeat = app.heartbeat;
var nicknameLength = app.nicknameLength;
var messageLength = app.messageLength;
var server = new RemoteFluxServer(port);

// Stores
var nicknames = server.Store("/nicknames", server.lifespan);
var messages = server.Store("/messages", server.lifespan);
var hearbeats = {};

// Actions
server.Action("/setNickname", server.lifespan).onDispatch(function (_ref, clientHash) {
  var nickname = _ref.nickname;
  if (!nickname || !_.isString(nickname) || nickname.length > nicknameLength) {
    return;
  }
  hearbeats[clientHash] = Date.now();
  nicknames.set(clientHash, nickname).commit();
});

server.Action("/postMessage", server.lifespan).onDispatch(function (_ref, clientHash) {
  var message = _ref.message;
  if (!message || !_.isString(message) || message.length > messageLength) {
    return;
  }
  var nickname = nicknames.get(clientHash);
  if (!nickname) {
    return;
  }
  var date = Date.now();
  messages.set(_.uniqueId("m"), { date: date, nickname: nickname, message: message }).commit();
});

server.Action("/heartbeat", server.lifespan).onDispatch(function (params, clientHash) {
  hearbeats[clientHash] = Date.now();
});

// Periodically expire nicknames
server.lifespan.setInterval(function () {
  nicknames.working.forEach(function (nickname, clientHash) {
    if (hearbeats[clientHash] === void 0) {
      nicknames.unset(clientHash);
    }
  });
  hearbeats = {};
  if (nicknames.dirty) {
    nicknames.commit();
  }
}, heartbeat);

console.log("flux-server listening on port", port);