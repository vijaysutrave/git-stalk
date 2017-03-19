/* global localStorage */

import React, {PropTypes} from 'react'
import Card from './Card'
import '../client/scss/layout.scss'
import '../client/scss/libs.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import repoActions from './actions'

const ReactToastr = require('react-toastr')
const { ToastContainer } = ReactToastr
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class Header extends React.Component {

  static propTypes = {
    repos: PropTypes.array.isRequired,
    repoActions: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      repoName: ''
    }

    this.handleOnchange = this.handleOnchange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const getLastSyncTime = localStorage.getItem('lastSync')
    if (getLastSyncTime && Math.floor(new Date().getTime() / 1000) - getLastSyncTime > 300) {
      this.props.repoActions.updateLatestData(Object.keys(this.props.repos))
      localStorage.setItem('lastSync', Math.floor(new Date().getTime() / 1000))
    } else if (!getLastSyncTime) {
      localStorage.setItem('lastSync', Math.floor(new Date().getTime() / 1000))
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.repoActions.addRepo(this.state.repoName).then(() => {
      this.setState(Object.assign({}, this.state, {repoName: ''}))
    }, (err) => {
      this.refs.container.error(
        'This repo is either private or you misspelt it. Repo format: <github-username>/<repo-name>',
        'Error while adding repo', {
          timeOut: 9000,
          closeButton: true
        })
    })
  }

  handleOnchange (event) {
    this.setState(Object.assign({}, this.state, { repoName: event.target.value }))
  }

  renderCards () {
    return Object.keys(this.props.repos).map((repo) => {
      return (
        <Card repo={this.props.repos[repo]} key={this.props.repos[repo].name} />
      )
    })
  }

  renderEmpty () {
    return (
      <div className='empty-state'>
        <div className='empty-icon'><img src='public/icons/empty.svg' width='200' /></div>
        <div className='empty-text'>
          You don't have any repos added, add public repos to get started.
          <div> You can upto 5 repositories to stalk.</div>
          <div>Format: `username/repo-name`</div>
        </div>
      </div>
    )
  }

  renderInput () {
    return (
      <div className='repo-add'>
        <form onSubmit={this.handleSubmit} >
          <input type='text' placeholder='Add a repo' className='input' onChange={this.handleOnchange
          } />
        </form>
      </div>
    )
  }

  render () {
    return (
      <div className='wrapper'>
        <header className='header'>
          <div className='logo'><img src='public/icons/logo.svg' width='30' /></div>
          <div className='title'>Git-Stalk</div>
          { Object.keys(this.props.repos).length < 5 && this.renderInput() }
        </header>
        <ToastContainer
          ref='container'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-right' />
        <div className='repos'>
          { Object.keys(this.props.repos).length ? this.renderCards() : this.renderEmpty() }
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
})(Header)

module.exports = Header
