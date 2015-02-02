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
var React = require("react-nexus").React;
var Link = _interopRequire(require("./Link"));

var Nav = React.createClass({
  displayName: "Nav",
  render: function render() {
    return React.createElement(
      "ul",
      { className: "Nav" },
      React.createElement(
        "li",
        { key: "chatroom" },
        React.createElement(
          Link,
          { href: "/" },
          "Chat room"
        )
      ),
      React.createElement(
        "li",
        { key: "about" },
        React.createElement(
          Link,
          { href: "/about" },
          "About"
        )
      )
    );
  },

  statics: {
    styles: {
      ".Nav": {
        padding: "5px" },
      ".Nav > li": {
        display: "inline-block" } } } });

module.exports = Nav;