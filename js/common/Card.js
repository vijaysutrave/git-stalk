import React from 'react'
import Delete from 'react-icons/md/delete'
import Star from 'react-icons/go/star'
import Fork from 'react-icons/go/repo-forked'
import Issues from 'react-icons/go/issue-opened'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import repoActions from './actions'

class Card extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      confirm: false
    }

    this.deleteRepo = this.deleteRepo.bind(this)
    this.showDelete = this.showDelete.bind(this)
    this.showConfirm = this.showConfirm.bind(this)
  }

  deleteRepo () {
    this.props.repoActions.deleteRepo(this.props.repo.name)
  }

  showDelete () {
    this.setState(Object.assign({}, this.state, { confirm: false }))
  }

  showConfirm () {
    this.setState(Object.assign({}, this.state, { confirm: true }))
  }

  renderConfirm () {
    return (
      <div className='confirm-group'>
        <div>Delete {this.props.repo.name} ?</div>
        <button
          className='btn warning'
          onClick={this.deleteRepo}>
          Yes
        </button>
        <button
          className='btn success'
          onClick={this.showDelete}>
          No
        </button>
      </div>
      )
  }

  renderDelete () {
    return (
      <a className='delete-item' onClick={this.showConfirm}><Delete /></a>
      )
  }

  render () {
    return (
      <div className='card'>
        <div className='repo'>
          <div className='repo-name'>
            <a href={`http://github.com/${this.props.repo.name}`}>{this.props.repo.name}</a>
          </div>
          <div className='delete-section'>
            { this.state.confirm ? this.renderConfirm() : this.renderDelete() }
          </div>
        </div>
        <div className='repo-info'>
          <div className='info-item stars'><Star /> {this.props.repo.stars}</div>
          <div className='info-item forks'><Fork /> {this.props.repo.forks}</div>
          <div className='info-item issues'><Issues /> {this.props.repo.issues}</div>
        </div>
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
})(Card)

module.exports = Card
