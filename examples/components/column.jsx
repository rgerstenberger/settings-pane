var React = require("react");
var Radium = require("radium");
var Settings = require("../settings.js");
var SubHeading = require("./sub-heading.jsx");

module.exports = React.createClass({
  mixins: [Radium.StyleResolverMixin],
  getStyles: function () {
    return {
      boxSizing: "border-box",
      float: "left",
      width: 100 / Settings.numColumns + "%",
      padding: "0 " + Settings.columnPadding
    };
  },
  render: function () {
    return (
      <div style={this.buildStyles(this.getStyles())}>
        <SubHeading>Column {this.props.colIndex + 1}</SubHeading>
        <p style={{fontSize: Settings.bodyFontSize, color: Settings.primaryTextColor}}>
          Bacon ipsum dolor amet ball tip swine chuck ribeye pork chop, beef shank drumstick. Strip steak ham pig meatball andouille shankle. Doner pork belly picanha drumstick kevin. Cupim drumstick tri-tip strip steak turducken. Jowl alcatra ball tip short loin salami beef capicola drumstick, shankle ground round turkey pork belly flank doner porchetta. Venison pork swine kielbasa, ribeye cow hamburger turkey andouille.
        </p>
      </div>
    );
  }
});
