export default (state = { repos: {} }, action) => {
  switch (action.type) {
    case 'ADD_REPO':
    	  const newRepos = Object.assign({}, state.repos, {[action.data.full_name]: action.data})
	      
	      return Object.assign({}, this.state, {
	      	repos: newRepos
	      });

    case 'DELETE_REPO': 
      const updatedRepo = Object.assign({}, state.repos);
      delete updatedRepo[action.data]

      return Object.assign({}, this.state, {
        repos: updatedRepo
      });

    default:
          return state;
  }
};
