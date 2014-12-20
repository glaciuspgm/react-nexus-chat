"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;var R = require("react-nexus");
var React = R.React;

var ChatRoom = require("./ChatRoom");

var Root = React.createClass({ displayName: "Root",
  mixins: [R.Root.Mixin],

  render: function () {
    return React.createElement("div", { className: "Root" }, React.createElement(ChatRoom, null));
  } });

module.exports = Root;