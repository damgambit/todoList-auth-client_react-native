import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

import {loginUser, signupUser, addAlert} from '../actions';


var Login = React.createClass({
  getInitialState() {
  	return {
  		email: "",
  		password: "",
  		emailError: "",
  		passwordError: "",
      loading: false
  	}
  },

  onSignIn: function() {
  	var {email, password} = this.state;
    var {dispatch} = this.props;

    this.setState({
      loading: true
    });

    dispatch(loginUser(email, password)).then(() => {
      this.setState({
        loading: false
      });
    });
  	
  },

  onSignUp: function() {
    var {email, password} = this.state;
    var {dispatch} = this.props;

    this.setState({
      loading: true
    });

    dispatch(signupUser(email, password)).then(() => {
      this.setState({
        loading: false
      });
    });
    
  },

  validate: function() {
    this.setState({
  		emailError: "",
  		passwordError: ""

  	});

  	if(!this.state.email) {
  		this.setState({
     			emailError: "Please enter an Email."
     		});
  	}
  	if(!this.state.password) {
  		this.setState({
     			passwordError: "Please enter a Password."
     		});
  	}

    if(this.state.email && this.state.password) {
      return true;
    } else {
      return false;
    }
  },

  render() {
  	var renderError = (error) => {
  		if(error != "") {
  			return (
  				<Text style={styles.formError}>
  					{error}
  				</Text>
  			)
  		}
  	}

    if(this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            Loading...
          </Text>
        </View>
      )

    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Todo Login
            </Text>
          </View>
          <View style={styles.field}>
            <TextInput 
              value={this.state.email}
              autoCapitalize='none'
              autoCorrect={false} 
              autoFocus={true} 
              keyboardType='email-address'
              returnKeyType='done'
              onChangeText={(text) => {
                this.setState({
                  email: text
                });
              }}
              placeholder='Email'
              style={styles.textInput} 
            />
            <View>
              {renderError(this.state.emailError)}
            </View>
          </View>
          <View style={styles.field}>
            <TextInput 
              value={this.state.password}
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect={false} 
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
              placeholder='Password'
              style={styles.textInput} 
            />
            <View>
              {renderError(this.state.passwordError)}
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={this.onSignIn}>
              <Text style={styles.button}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSignUp}>
              <Text style={styles.button}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ca0064'
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
  field: {
  	padding: 12,
  	paddingLeft: 16,
  	borderRadius: 8,
  	margin: 6,
  	marginTop: 0,
  	backgroundColor: 'white'
  },
  buttonsContainer: {
  	padding: 20,
  	justifyContent: 'space-around',
  	alignItems: 'center',
  	flexDirection: 'row' 
  },
  button: {
  	color: 'white',
  	fontSize: 30

  },
  formError: {
  	color: 'red'
  }
});




module.exports = connect()(Login);