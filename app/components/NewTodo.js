import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';

import {addAlert, createTodo} from '../actions';


var NewTodo = React.createClass({
  getInitialState() {
  	return {
  		newTodoText: undefined,
  		loading: false
  	}
  },

  onBack() {
  	this.props.navigator.pop();
  },

  onAddNewToDo() {
  	var newTodoText = this.state.newTodoText;
  	if(newTodoText !== undefined && newTodoText !== "") {
  		this.setState({
  			loading: true
  		});
  		this.props.dispatch(createTodo(newTodoText)).then(() => {
  			this.setState({
  				loading: true
  			});
		  	this.props.navigator.pop();
  		});

  	} else {
  		this.props.dispatch(addAlert("Insert some text and try again!"))
  	}
  },

  render() {

	var renderScrollViewOrLoading = () => {
	  	if(this.state.loading) {
	      return (
	        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	          <Text>
	            Creating Todo...
	          </Text>
	        </View>
	      )
	    } else {
	    	return (
	    		<ScrollView
		      		automaticallyAdjustContentInsets={false}
		      		contentContainerStyle={styles.scrollviewContainer} >
		      		<View style={styles.inputContainer}>
			      		<TextInput 
			      			onChangeText={(newTodoText) => {
			      				this.setState({
			      					newTodoText: newTodoText
			      				});
			      			}}
			      			placeholder="New Todo text"
			      			style={styles.input}
			      		/>
			      	</View>
		      	</ScrollView>
	    	)
	    }
  	}
    return (
      <View style={styles.container}>
      	<View style={styles.topBar}>
			<TouchableOpacity onPress={this.onBack}>
			  <Icon name="chevron-left" size={20} color='white' />
			</TouchableOpacity>
      		<Text style={styles.title}>
      			New Todo
      		</Text>
      		<TouchableOpacity onPress={this.onAddNewToDo}>
			  <Icon name="check" size={20} color='white' />
			</TouchableOpacity>
      	</View>

      	{renderScrollViewOrLoading()}
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
  inputContainer: {
  	padding: 5,
  	paddingLeft: 10,
  	margin: 10,
  	borderWidth: 2,
  	borderRadius: 8,
  	borderColor: "#2ecc71"
  },
  input: {
  	fontSize: 18
  }

});

var mapStateToProps = (state) => {
	return {
		todos: state.todos
	}
}


module.exports = connect(mapStateToProps)(NewTodo);