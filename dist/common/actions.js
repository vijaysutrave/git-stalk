import axios from 'axios';

var actions = {
	loadRepos: function loadRepos(repo) {
		return function (dispatch) {
			return axios.get('https://api.github.com/repos/' + repo).then(function (response) {
				console.log(reposnse);
				dispatch({
					type: 'REPO_DATA',
					data: response.data
				});
			});
		};
	}
};