import axios from 'axios';
import ACTION from '../constants'

const actions = {
	loadRepos: function(repo) {
		return (dispatch) => {
			return axios.get('https://api.github.com/repos/'+repo)
				.then((response) =>  {
					console.log(response);
					dispatch({
						type: 'REPO_DATA',
						data: response.data
					});
				});
		}
	},
	addRepo: function(repo) {
		return (dispatch) => {
			console.log('came into dispatch');
			return axios.get('https://api.github.com/repos/'+repo)
				.then((response) =>  {
					console.log(response);
					dispatch({
						type: ACTION.ADD_REPO,
						data: response.data
					});
				})
		}
	},
	deleteRepo: function (id) {
		return(dispatch) => {
			dispatch({
				type: ACTION.DELETE_REPO,
				data: id
			})	
		}
	},
	updateLatestData: function (repos) {
		return(dispatch) => {
			if(repos) {
				const freshData = {};
				const promises = [];
				repos.forEach((repo) => {
					promises.push(axios.get('https://api.github.com/repos/'+repo))
				});

				axios.all(promises)
					.then((results) => {
						results.forEach( (result) => {
							freshData[result.data.full_name] = {
																	stars: result.data.stargazers_count, 
																	name: result.data.full_name,
																	forks: result.data.forks_count,
                                            						issues: result.data.open_issues_count
																}
						});
						
						dispatch({
							type: 'UPDATE_DATA',
							data: freshData
						});
					})
			}

		}
	}
}

export default actions