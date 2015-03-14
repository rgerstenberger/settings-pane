var React = require('react');
var Radium = require('radium');
var RadiumSettingsInspector = require('../index.js');

var Settings = require("./settings.js");

var Navbar = require("./components/navbar.jsx");
var NavLink = require("./components/nav-link.jsx");
var SearchBar = require("./components/search-bar.jsx");
var Heading = require("./components/Heading.jsx");
var SubHeading = require("./components/sub-heading.jsx");
var Column = require("./components/column.jsx");

var settingsInspector = new RadiumSettingsInspector(Settings);

var App = React.createClass({
  mixins: [settingsInspector.mixin],
  render: function () {
    var columns = []
    var numColumns = parseInt(Settings.numColumns);

    if (!Number.isNaN(numColumns)) {
      for (var i = 0; i < numColumns; i++) {
        columns.push(<Column key={i} colIndex={i} numColumns={numColumns}></Column>);
      }
    }

    return (
      <div style={{fontFamily: Settings.bodyFontFamily}}>
        <Navbar>
          <NavLink>Link</NavLink>
          <NavLink>Link</NavLink>
          <SearchBar></SearchBar>
        </Navbar>
        <Heading>Settings Inspector</Heading>
        <SubHeading>Edit React apps on the fly</SubHeading>
        <div style={{width: "100%"}}>
          {columns}
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
