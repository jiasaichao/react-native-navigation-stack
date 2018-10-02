/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
// import { SimpleNavigation } from 'react-native-navigation-stack';
// import { config } from '../../src/config';
import { SimpleNavigation } from './navSrc';

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Home'
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: '#f66',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <Text style={{ color: '#222' }}>home1111111111111111111111111111111111111</Text>
      </View>
    );
  }
}
class UserScreen extends React.Component {
  static navigationOptions = {
    headerTitle: '我的'
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: '#66f',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <Text style={{ color: '#222' }}>home22222222222222222222222222222222222</Text>
      </View>
    );
  }
}

const App1 = new SimpleNavigation(
  {
    A1: { screen: HomeScreen },
    A2: { screen: UserScreen }
  },
  { initialRouteName: 'A1' }
);
export default App1;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
