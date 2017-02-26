const React = require('react')
const Card = require('./Card')
const { connector } = require('./store')
import '../client/scss/layout.scss';
// import data from '../data.json'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import repoActions from './actions';

class Header extends React.Component {
  constuctor() {
    this.state = {
      repoName: ''
    }

    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
   
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.repoActions.addRepo(this.state.repoName);
  }

  handleOnchange(event) {
    this.setState(Object.assign({}, this.state, {repoName: event.target.value}));
  }

  render() {
    return (
      <div className="wrapper">
        <header className='header'>
          <div className="logo"></div>
          <div className="title">Git-Stalk</div>
          <div className="repo-add">
            <form onSubmit={this.handleSubmit.bind(this)} >
              <input type="text" placeholder="Add a repo"  className="input" onChange={this.handleOnchange.bind(this)} /> 
            </form>
          </div>
        </header>
        <div className="repos">
          { 
            Object.keys(this.props.repos).map( (repo) => {
              return (
                  <Card repo={this.props.repos[repo]} key={ this.props.repos[repo].full_name } />
                )
            })
          }
        </div>
      </div>
    )
  }
}



Header = connect((state) => {
  return {
    repos: state.repos 
  }
}, (dispatch) => {
  return {
    repoActions: bindActionCreators(repoActions, dispatch)
  }
})(Header);

module.exports = Header