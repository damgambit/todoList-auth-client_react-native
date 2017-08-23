import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';

import {unauthUser, getTodos, deleteTodo} from '../actions';
import NewTodo from './NewTodo';


var TodoItem = connect()(React.createClass({
  getInitialState() {
    return {
      deleting: false
    }
  },

  onDelete() {
    this.setState({
      deleting: true
    });

    this.props.dispatch(deleteTodo(this.props.id)).then(() => {
      this.setState({
        deleting: false
      });
    });

  },

	render() {
    var renderDeleteButton = () => {
      if(!this.state.deleting) {
        return (
          <TouchableOpacity onPress={this.onDelete}>
            <Icon name="trash-o" size={20} color='red' />
          </TouchableOpacity>
        )
      }
    }

		return(
			<View style={styles.todosContainer}>
				<Text style={styles.todoText}>
					{this.props.text}
				</Text>
        {renderDeleteButton()}
			</View>
		)
	}
}));


var TodoList = React.createClass({
  getInitialState() {
  	return {
  		refreshing: false,
      loading: false
  	}
  },

  onLogOut() {
  	this.props.dispatch(unauthUser);
  },

  onAddNewToDo() {
    this.props.navigator.push({
      component: NewTodo,
      title: "New Todo",
      navigationBarHidden: true
    })
  },

  onRefresh() {
    this.setState({
      refreshing: true
    });

    this.props.dispatch(getTodos).then(() => {
      this.setState({
        refreshing: false
      });
    });
  },

  render() {
  	

  	var renderTodos = () => {
  		console.log("todos: ", this.props.todos);
  		return this.props.todos.map((todo) => {
  			return (
  				<TodoItem key={todo._id} text={todo.text} id={todo._id}/>
  			)
  		})
  	}
    return (
      <View style={styles.container}>
      	<View style={styles.topBar}>
			<TouchableOpacity onPress={this.onLogOut}>
			  <SimpleIcon name="logout" size={20} color='white' />
			</TouchableOpacity>
      		<Text style={styles.title}>
      			Todo List
      		</Text>
      		<TouchableOpacity onPress={this.onAddNewToDo}>
			  <Icon name="plus" size={20} color='white' />
			</TouchableOpacity>
      	</View>
      	<ScrollView
      		refreshControl = {
      			<RefreshControl 
      				refreshing={this.state.refreshing}
      				onRefresh={this.onRefresh}/>
      		}
      		automaticallyAdjustContentInsets={false}
      		contentContainerStyle={styles.scrollviewContainer} >
      		{renderTodos()}
      	</ScrollView>
      </View>
    );
  }

});


 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
  	justifyContent: 'space-between',
  	alignItems: 'center',
  	flexDirection: 'row',
  	backgroundColor: '#ca0064',
  	padding: 16,
  	paddingTop: 24,
  	paddingBottom: 8
  },
  title: {
  	color: 'white',
  	fontSize: 30
  },
  todosContainer: {
  	padding: 16,
  	borderTopWidth: 1,
  	borderBottomWidth: 1,
  	marginBottom: -1,
  	borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between' 
  }
});

var mapStateToProps = (state) => {
	return {
		todos: state.todos
	}
}


module.exports = connect(mapStateToProps)(TodoList);