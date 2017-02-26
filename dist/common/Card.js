var React = require('react');

var Card = React.createClass({
	displayName: "Card",
	render: function render() {
		return React.createElement(
			"div",
			{ className: "card" },
			React.createElement(
				"div",
				{ className: "repo" },
				"chrome paint"
			),
			React.createElement(
				"div",
				{ className: "stars" },
				"100"
			)
		);
	}
});

module.exports = Card;