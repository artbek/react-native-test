import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
	Navigator,
	DrawerLayoutAndroid,
	Text,
	View,
	TouchableHighlight,
} from 'react-native';


const Geo = require('./Geo');
const Cog = require('./Cog');


class Test extends Component {

	constructor(props) {
		super(props);
		this._navigator = 0;
	}

	navigatorRenderScene(route, navigator) {
		//console.log(`Routing to: ${route.id} ...`);
		switch (route.id) {
			case 'cog':
				return <Cog navigator={navigator} {...route.passProps} />;
				break;
			case 'geo':
				return <Geo navigator={navigator} {...route.passProps} />;
				break;
		}
	}

	_navigate(property) {
		this._navigator.push({id: property});
		this.refs.drawer.closeDrawer();
	}

	_setNavigatorRef(navigator) {
		this._navigator = navigator;
	}

	render() {
		//console.log('rrrrrrrrrrrrrrrrrrrrrr');

		var navigationView = (
			<View style={styles.container}>
				<TouchableHighlight style={styles.nav} underlayColor='#aaaaaa' onPress={() => this._navigate('geo')}>
					<Text style={styles.nav_text}>Geo</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.nav} underlayColor='#aaaaaa' onPress={() => this._navigate('cog')}>
					<Text style={styles.nav_text}>Cog</Text>
				</TouchableHighlight>
			</View>
		);

		return (
			<DrawerLayoutAndroid
				ref="drawer"
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navigationView}
			>
				<Navigator
					//style={styles.container}
					initialRoute={{id: 'cog', index: 0}}
					renderScene={this.navigatorRenderScene.bind(this)}
					ref={this._setNavigatorRef.bind(this)}
				/>
			</DrawerLayoutAndroid>
		);
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#f3f3f3',
  },
	nav: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#999999',
	},
	nav_text: {
		fontSize: 30,
	},
});

AppRegistry.registerComponent('Test', () => Test);

