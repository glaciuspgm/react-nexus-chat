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
var Nexus = _interopRequire(require("react-nexus"));

var Lifespan = _interopRequire(require("lifespan"));

var React = Nexus.React;
var app = require("../config").app;
var nicknameLength = app.nicknameLength;


var NicknameInput = React.createClass({
  displayName: "NicknameInput",
  mixins: [Nexus.Mixin, Lifespan.Mixin, React.addons.PureRenderMixin],

  getInitialState: function getInitialState() {
    return {
      input: "",
      disabled: false };
  },

  setNicknameAction: null,

  componentDidMount: function componentDidMount() {
    this.setNicknameAction = this.getNexus().remote.Action("/setNickname", this.getLifespan());
  },

  updateInput: function updateInput(ev) {
    var input = ev.target.value;
    if (this.state.disabled) {
      return;
    }
    if (input.length > nicknameLength) {
      return;
    }
    this.setState({ input: input });
  },

  submitForm: function submitForm(ev) {
    ev.preventDefault();
    if (this.state.disabled) {
      return;
    }
    this.setState({ disabled: true });
    this._setNickname.dispatch({ nickname: this.state.input });
  },

  render: function render() {
    return React.createElement(
      "form",
      { className: "NicknameInput", onSubmit: this.submitForm },
      React.createElement(
        "label",
        null,
        "Enter your nickname"
      ),
      React.createElement("input", { type: "text", onChange: this.updateInput, value: this.state.input, disabled: this.state.disabled })
    );
  } });

module.exports = NicknameInput;