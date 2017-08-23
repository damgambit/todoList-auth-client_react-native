import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
//import {} from '../actions'

import Login from './Login';
import Main from './Main';
import AlertsContainer from './AlertsContainer';


var App = React.createClass({

  render() {
    var renderMainView = () => {
      if(this.props.user_id) {
        return (
          <Main />
        );
      } else {
        return (
          <Login />
        );
      }    
    }

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        {renderMainView()}
        <AlertsContainer />
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

});


var mapStateToProps = (state) => {
	return {
		user_id: state.auth.user_id
	}
}


module.exports = connect(mapStateToProps)(App);