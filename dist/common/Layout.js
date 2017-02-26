var React = require('react');
// const Header = require('Header')
var Card = require('./Card');

var _require = require('./store'),
    connector = _require.connector;

var Header = React.createClass({
  displayName: 'Header',

  componentDidMount: function componentDidMount() {
    console.log('mounted the component');
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'wrapper' },
      React.createElement(
        'header',
        { className: 'header' },
        React.createElement('div', { className: 'logo' }),
        React.createElement(
          'div',
          { className: 'title' },
          'Git-Stalk'
        )
      ),
      React.createElement(Card, null)
    );
  }
});

module.exports = Header;