export default (state = { repos: {} }, action) => {
  switch (action.type) {
    case 'ADD_REPO':
      const newRepos = Object.assign({}, state.repos, {
        [action.data.full_name]: {
          stars: action.data.stargazers_count,
          name: action.data.full_name,
          forks: action.data.forks_count,
          issues: action.data.open_issues_count
        }
      })
      return Object.assign({}, this.state, {
        repos: newRepos
      })

    case 'DELETE_REPO':
      const updatedRepo = Object.assign({}, state.repos)
      delete updatedRepo[action.data]

      return Object.assign({}, this.state, {
        repos: updatedRepo
      })

    case 'UPDATE_DATA':
      return Object.assign({}, this.state, { repos: action.data })

    default:
      return state
  }
}
