var React = require('react');
var SettingsPane = require('./lib/settings-pane');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

module.exports = function (settingsObj, configureMethod) {
  var self = this;

  assign(this, EventEmitter.prototype);

  var settingsPaneDiv = document.createElement('div');
  document.body.appendChild(settingsPaneDiv);

  React.render(
    React.createElement(
      SettingsPane, {
        settings: settingsObj,
        changeHandler: function (name, val) {
          if (typeof configureMethod === 'function') {
            var newSettings = {};

            newSettings[name] = val;
            configureMethod(newSettings);
          } else {
            settingsObj[name] = val;
          }
          self.emit('change');
        }
      }
    ),
    settingsPaneDiv
  );

  this.mixin = {
    componentDidMount: function () {
      this.__listener = function () {
        this.forceUpdate();
      }.bind(this);

      self.on('change', this.__listener);
    },
    componentWillUnmount: function() {
      this.__listener && self.removeChangeListener(this.__listener);
    }
  }
}