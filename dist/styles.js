"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;module.exports = {
  colors: {
    Text: "#484848",
    Link: "#aaa",
    LinkHover: "#fafafa",
    LinkActive: "#fff" },

  fonts: {
    Roboto: "\"Roboto\", sans-serif",
    OpenSansCondensed: "\"Open Sans Condensed\", sans-serif",
    OpenSans: "\"Open Sans\", sans-serif" },

  dimensions: {
    chatMessageHeight: 33.593 + 3.599 } };