var React = require("react");
var Radium = require("radium");
var Settings = require("../settings.js");

module.exports = React.createClass({
  mixins: [Radium.StyleResolverMixin],
  getStyles: function () {
    return {
      backgroundColor: Settings.navbarBgColor,
      boxSizing: "border-box",
      height: Settings.navbarHeight,
      width: "100%",
      padding: "0 20px"
    };
  },
  render: function () {
    return (
      <div style={this.buildStyles(this.getStyles())}>
        {this.props.children}
      </div>
    );
  }
});
