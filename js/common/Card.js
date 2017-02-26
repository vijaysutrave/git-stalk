const React = require('react')
import Delete from 'react-icons/md/delete';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import repoActions from './actions'

class Card extends React.Component {

	constructor(props) {
		super(props);

		this.deleteRepo = this.deleteRepo.bind(this);
	}

	deleteRepo(id) {
		this.props.repoActions.deleteRepo(id)
	}

	render() {
		return (
			<div className="card">
				<div className="repo">
					<div className="repo-name"> {this.props.repo.full_name} </div>
					<div className="delete-section"><a onClick={this.deleteRepo.bind(this, this.props.repo.full_name)}><Delete /></a></div>
				</div>
				<div className="stars">{this.props.repo.stargazers_count}</div>
			</div>
		)
	}
}

Card = connect((state) => {
  return {
    repos: state.repos 
  }
}, (dispatch) => {
  return {
    repoActions: bindActionCreators(repoActions, dispatch)
  }
})(Card);

module.exports = Card;