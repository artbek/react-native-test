/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableHighlight,
} from 'react-native';


class customChromeTabs extends Component {
  render() {
    return (
      <View style={styles.container}>
				<TouchableHighlight onPress={() => this._chrome()}>
					<Text>Chrome</Text>
				</TouchableHighlight>
      </View>
    );
  }

	_chrome() {
		NativeModules.ToastAnd.launchUrl("http://artbek.co.uk/deep.html");
	}

	componentDidMount() {
		NativeModules.ToastAnd.show("Aweosme", NativeModules.ToastAnd.BILL);
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddddff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
  }
});

AppRegistry.registerComponent('customChromeTabs', () => customChromeTabs);
