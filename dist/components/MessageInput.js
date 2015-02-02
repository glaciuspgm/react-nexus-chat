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

var React = Nexus.React;
var Lifespan = _interopRequire(require("lifespan"));

var app = require("../config").app;
var messageLength = app.messageLength;


var MessageInput = React.createClass({
  displayName: "MessageInput",
  mixins: [React.addons.PureRenderMixin, Nexus.Mixin, Lifespan.Mixin],
  propTypes: {
    nickname: React.PropTypes.string.isRequired },

  getInitialState: function getInitialState() {
    return {
      input: "" };
  },

  postMessageAction: null,

  componentDidMount: function componentDidMount() {
    this.postMessageAction = this.getNexus().remote.Action("/postMessage", this.getLifespan());
  },

  submitForm: function submitForm(ev) {
    ev.preventDefault();
    this.postMessageAction.dispatch({ message: this.state.input });
    this.setState({ input: "" });
  },

  updateInput: function updateInput(ev) {
    var input = ev.target.value;
    if (input > messageLength) {
      return;
    }
    this.setState({ input: input });
  },

  render: function render() {
    return React.createElement(
      "form",
      { className: "MessageInput", onSubmit: this.submitForm },
      React.createElement(
        "label",
        null,
        this.props.nickname
      ),
      React.createElement("input", { type: "text", onChange: this.updateInput, value: this.state.input })
    );
  } });

module.exports = MessageInput;