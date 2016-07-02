import React, { Component } from 'react';

import {
	StyleSheet,
  Text,
  View,
	TouchableHighlight,
} from 'react-native';


module.exports = class Nav extends Component {

	_navigate(property) {
		this.props.navigator.push({
			id: property
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={() => this._navigate('cog')}>
					<Text style={styles.nav}>Cog</Text>
				</TouchableHighlight>
			</View>
		);
	}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111122',
  },
	nav: {
		flex: 1,
    backgroundColor: '#009999',
		fontSize: 30,
	},
});

