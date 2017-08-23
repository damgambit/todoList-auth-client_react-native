import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight
} from 'react-native';

var t = require('tcomb-form-native');

import {authUser, addAlert} from '../actions';



var Form = t.form.Form;

// here we are: define your domain model
var User = t.struct({
  email: t.String,              // a required string
  password: t.String,              // a required string


});

var options = {}; // optional rendering options (see documentation)



var Login = React.createClass({
  onPress: function () {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of User
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Todo Login
          </Text>
        </View>
        {/* display */}
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }

  // getInitialState() {
  // 	return {
  // 		formData: {}
  // 	}
  // },


  // login() {
  //   const formValues = this.formGenerator.getValues();
  //   console.log('FORM VALUES', formValues);
  //   this.props.dispatch(addAlert('hellooo'));
  // },

  // render() {
  // 	var renderError = (error) => {
  // 		if(error != "") {
  // 			return (
  // 				<Text style={styles.formError}>
  // 					{error}
  // 				</Text>
  // 			)
  // 		}
  // 	}

  //   return (
  //     <View style={styles.container}>
  //     	<StatusBar barStyle='light-content' />
  //     	<View style={styles.titleContainer}>
  //     		<Text style={styles.title}>
  //     			Todo Login
  //     		</Text>
  //     	</View>
  //     	<View style={styles.wrapper}>
  //         <View>
  //           <GenerateForm
  //             ref={(c) => {
  //               this.formGenerator = c;
  //             }}
  //             fields={fields}
  //           />
  //         </View>
  //         <View style={styles.submitButton}>
  //           <Button block onPress={() => this.login()}>
  //             <Text style={styles.button}>Login</Text>
  //           </Button>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  titleContainer: {
  	padding: 10,
  	paddingTop: 20,
  	marginBottom: 10,
  	justifyContent: 'space-around',
  	alignItems: 'center',
  	backgroundColor: '#ca0064' 
  },
  title: {
  	color: 'white',
  	fontSize: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});




module.exports = connect()(Login);