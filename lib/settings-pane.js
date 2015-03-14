// React
var React = require('react');
var Radium = require('radium');
var assign = require('object-assign');
var Filesaver = require( 'browser-filesaver' );
var Blob = require('blob');

var $__0=     Radium,StyleResolverMixin=$__0.StyleResolverMixin,BrowserStateMixin=$__0.BrowserStateMixin;

var SettingsPane = React.createClass({displayName: "SettingsPane",
  mixins: [ StyleResolverMixin, BrowserStateMixin ],

  getInitialState: function () {
    // Clone settings to be overwritten locally
    return {
      paneExpanded: true,
      settings: assign({}, this.props.settings),
      cachedSettings: {}
    }
  },
  getPaneStyles: function () {
    return {
      backgroundColor: "#fff",
      borderRadius: 5,
      border: "1px solid #999",
      height: 400,
      width: 400,
      top: 30,
      left: this.state.paneExpanded ? 0 : -400,
      position: "absolute",
      fontFamily: '\"Helvetica Neue\",Helvetica,Arial,sans-serif',
      opacity: 0.2,
      transition: "400ms all ease",

      states: [{
        hover: {
          opacity: 0.97
        }
      }]
    };
  },
  getLabelStyles: function () {
    return {
      marginLeft: 10
    };
  },
  getInputStyles: function () {
    return {
      borderRadius: 5,
      padding: 5,
      marginRight: 5
    };
  },
  getButtonStyles: function (isActive) {
    return {
      backgroundImage: "none",
      backgroundColor: isActive ? "#4169bf" : "#ccc",
      border: "1px solid transparent",
      borderRadius: 4,
      color: "#fff",
      cursor: isActive ? "pointer" : "not-allowed",
      display: "inline-block",
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 1.42857143,
      marginBottom: 0,
      padding: "4px 8px",
      textAlign: "center",
      verticalAlign: "middle",
      whiteSpace: "nowrap",
      pointerEvents: isActive ? "auto" : "none"
    };
  },
  togglePane: function () {
    this.setState({
      paneExpanded: !this.state.paneExpanded
    });
  },
  saveSettings: function () {
    Filesaver(
      new Blob([JSON.stringify(this.state.settings)], {type: "application/json;charset=utf-8"}),
      "settings.json"
    );
  },
  resetAll: function () {
    Object.keys(this.state.settings).forEach(function (settingName) {
      this.resetValue(settingName);
    }.bind(this));
  },
  resetValue: function (name) {
    var originalVal = this.state.cachedSettings[name + "_original_"];
    var stateObj = {settings: this.state.settings};

    if (typeof originalVal != "undefined") {
      stateObj.settings[name] = originalVal;
      this.setState(stateObj);
      this.props.changeHandler(name, originalVal);

      delete this.state.cachedSettings[name + "_original_"];
    }
  },
  onChangeInput: function (name, ev) {
    var val = ev.target.value;
    var cachedOriginalVal = this.state.cachedSettings[name + "_original_"];
    var stateObj = {settings: this.state.settings, cachedSettings: this.state.cachedSettings};

    // Cache the original value if it's not cached and doesn't match current value
    if (typeof cachedOriginalVal == "undefined" && this.props.settings[name] !== val) {
      stateObj.cachedSettings[name + "_original_"] = this.props.settings[name];
    }

    // Save the new value
    stateObj.settings[name] = val;

    this.setState(stateObj);

    // Update the original settings object
    this.props.changeHandler(name, ev.target.value);
  },
  render: function () {
    var settingsHaveChanged = false;

    var inputMap = Object.keys(this.state.settings).map(function (settingName) {
      var val = this.state.settings[settingName];
      var originalVal = this.state.cachedSettings[settingName + "_original_"];
      var resetButtonActive = originalVal && originalVal !== val;

      if (resetButtonActive) {
        settingsHaveChanged = true;
      }

      return (
        React.createElement("div", {key: settingName, style: {display: "block", padding: 5, whiteSpace: "nowrap"}}, 
          React.createElement("button", {style: this.getButtonStyles(resetButtonActive), disabled: !resetButtonActive, onClick: this.resetValue.bind(this, settingName)}, "Reset"), 
          React.createElement("label", {style: this.getLabelStyles()}, 
            React.createElement("input", {
              style: this.getInputStyles(), 
              name: settingName, 
              value: val, 
              onChange: this.onChangeInput.bind(this, settingName)}
            ), 
            React.createElement("span", {style: {margin: "0 5px 0 0"}}, settingName)
          )
        )
      );
    }.bind(this));

    return (
      React.createElement("div", React.__spread({},  this.getBrowserStateEvents(), {style: this.buildStyles(this.getPaneStyles())}), 
        React.createElement("button", {onClick: this.togglePane, style: {position: "absolute", top: 8, left: "100%", padding: "10px 5px", fontSize: 16, backgroundColor: "#fff", backgroundImage: "none", border: "1px solid #999", borderRadius: "0 4px 4px 0", cursor: "pointer", outline: "none"}}, this.state.paneExpanded ? "<<" : ">>"), 
        React.createElement("h3", {style: {textAlign: "center", margin: 0, padding: 8, borderBottom: "1px solid #999"}}, "Settings"), 

        React.createElement("div", {style: {height: 300, overflowY: "scroll", overflowX: "scroll"}}, 
          inputMap
        ), 
        React.createElement("div", {style: {position: "absolute", display: "block", height: 60, width: 400, bottom: 0, borderTop: "1px solid #999"}}, 
          React.createElement("button", {style: assign(this.getButtonStyles(settingsHaveChanged), {padding: "8px 20px", margin: "11px 40px", float: "left"}), disabled: !settingsHaveChanged, onClick: this.saveSettings}, "Save"), 
          React.createElement("button", {style: assign(this.getButtonStyles(settingsHaveChanged), {padding: "8px 20px", margin: "11px 40px", float: "right"}), disabled: !settingsHaveChanged, onClick: this.resetAll}, "Reset all")
        )
      )
    );
  }
});

module.exports = SettingsPane;