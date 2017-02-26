import axios from 'axios';
import ACTION from '../constants'

const actions = {
	loadRepos: function(repo) {
		return (dispatch) => {
			return axios.get('https://api.github.com/repos/'+repo)
				.then((response) =>  {
					console.log(reposnse);
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
				});
		}
	},
	deleteRepo: function (id) {
		return(dispatch) => {
			dispatch({
				type: ACTION.DELETE_REPO,
				data: id
			})	
		}
	}
}

export default actions