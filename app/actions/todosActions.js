import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {TODOS_URL, TODO_URL} from '../api';

import {addAlert} from './alertsActions';



exports.createTodo = (text) => {
	return function(dispatch) {
		return Keychain.getGenericPassword().then((credentials) => {
			var {username, password} = credentials; //username = user_id, password = token

			return axios.post(TODOS_URL(username), {text}, {
				headers: {
					authorization: password
				}
			}).then((response) => {
				dispatch(addTodo(response.data.todo));
			}).catch((err) => {
				dispatch(addAlert("Could not create new Todo."));
			})
		})
	}
}

exports.deleteTodo = (todo_id) => {
	return function(dispatch) {
		return Keychain.getGenericPassword().then((credentials) => {
			var {username, password} = credentials; //username = user_id, password = token

			return axios.delete(TODO_URL(username, todo_id), {
				headers: {
					authorization: password
				}
			}).then((response) => {
				dispatch(removeTodo(todo_id));
			}).catch((err) => {
				dispatch(addAlert("Could not delete Todo."));
			})
		})
	}
}

exports.getTodos = function(dispatch) {
	return Keychain.getGenericPassword().then((credentials) => {
		var {username, password} = credentials; //username = user_id, password = token

		return axios.get(TODOS_URL(username), {
			headers: {
				authorization: password
			}
		}).then((response) => {
			dispatch(setTodos(response.data.todos));
		}).catch((err) => {
			dispatch(addAlert("Could not get Todos."));
		})
	})
}




var addTodo = (newTodo) => {
	return {
		type: 'ADD_TODO',
		newTodo
	}
}

var setTodos = (todos) => {
	return {
		type: 'SET_TODOS',
		todos
	}
}

var removeTodo = (todo_id) => {
	return {
		type: 'REMOVE_TODO',
		todo_id
	}
}