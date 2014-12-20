"use strict";

require("6to5/polyfill");var Promise = (global || window).Promise = require("lodash-next").Promise;var __DEV__ = (process.env.NODE_ENV !== "production");var __PROD__ = !__DEV__;var __BROWSER__ = (typeof window === "object");var __NODE__ = !__BROWSER__;module.exports = {
  supportedLocales: ["en", "fr"],

  uplink: {
    port: 22080,
    url: "http://localhost:22080" },

  render: {
    port: 22000,
    url: "http://localhost:22000" } };