var React = require("react");
var Settings = require("../settings.js");
var { StyleResolverMixin, BrowserStateMixin } = require('radium');

module.exports = React.createClass({
  mixins: [StyleResolverMixin, BrowserStateMixin],
  getStyles: function () {
    var verticalPadding = (parseInt(Settings.navbarHeight) - parseInt(Settings.navLinkFontSize)) / 2

    return {
      bosSizing: "border-box",
      color: Settings.navLinkColor,
      float: "right",
      fontSize: Settings.navLinkFontSize,
      lineHeight: 1,
      padding: "0 20px",
      paddingTop: verticalPadding,
      paddingBottom: verticalPadding,
      verticalAlign: "middle",

      states: [{
        hover: {
          backgroundColor: Settings.navLinkHoverBgColor
        }
      }]
    };
  },
  render: function () {
    return (
      <div {...this.getBrowserStateEvents()}
        style={this.buildStyles(this.getStyles())}>
        {this.props.children}
      </div>
    );
  }
});
