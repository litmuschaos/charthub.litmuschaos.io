import { GithubActions, GithubContributor } from "../model";

export const loadStarCount = () => (dispatch: Function, getState: Function) => {
	fetch("https://api.github.com/repos/litmuschaos/litmus")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			dispatch({
				type: GithubActions.LOAD_STAR_COUNT,
				payload: data["stargazers_count"],
			});
		});
};

export const loadContributors = () => (
	dispatch: Function,
	getState: Function
) => {
	fetch("https://api.github.com/repos/litmuschaos/litmus/contributors")
		.then((response) => response.json())
		.then((data) => {
			data = data.map((d: any) => ({
				githubName: d["login"],
				githubProfileUrl: "https://github.com/" + d["login"],
				contributions: d["contributions"],
			}));
			data.sort(
				(a: GithubContributor, b: GithubContributor) =>
					a.contributions > b.contributions
			);
			dispatch({
				type: GithubActions.LOAD_CONTRIBUTORS,
				payload: data,
			});
		});
};

// // Async Function expample with redux-thunk
// export function completeTodo(todoId: number) {
// 	// here you could do API eg

// 	return (dispatch: Function, getState: Function) => {
// 		dispatch({ type: TodoActions.COMPLETE_TODO, payload: todoId });
// 	};
// }

// export function uncompleteTodo(todoId: number): TodoAction {
// 	return {
// 		type: TodoActions.UNCOMPLETE_TODO,
// 		payload: todoId,
// 	};
// }

// export function deleteTodo(todoId: number): TodoAction {
// 	return {
// 		type: TodoActions.DELETE_TODO,
// 		payload: todoId,
// 	};
// }
