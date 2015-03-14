var React = require("react");
var Radium = require("radium");
var Settings = require("../settings.js");

module.exports = React.createClass({
  mixins: [Radium.StyleResolverMixin],
  getStyles: function () {
    return {
      color: Settings.secondaryTextColor,
      fontFamily: Settings.headingFontFamily,
      fontSize: 18,
      fontWeight: 400,
      textAlign: Settings.headingTextAlign
    };
  },
  render: function () {
    return (
      <h1 style={this.buildStyles(this.getStyles())}>{this.props.children}</h1>
    );
  }
});

