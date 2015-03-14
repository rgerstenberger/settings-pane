var React = require("react");
var Radium = require("radium");
var Settings = require("../settings.js");

module.exports = React.createClass({
  mixins: [Radium.StyleResolverMixin],
  getStyles: function () {
    return {
      color: Settings.primaryTextColor,
      fontFamily: Settings.headingFontFamily,
      fontSize: 36,
      marginBottom: 10,
      textAlign: Settings.headingTextAlign
    };
  },
  render: function () {
    return (
      <h1 style={this.buildStyles(this.getStyles())}>{this.props.children}</h1>
    );
  }
});
