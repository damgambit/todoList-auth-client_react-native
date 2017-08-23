/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {configureStore} from './app/store';
import App from './app/components/App';


export default class rnAuth extends Component {
  render() {
    return (
      <Provider store={configureStore()}>

        <App />

      </Provider>
    );
  }
}

AppRegistry.registerComponent('rnAuth', () => rnAuth);
