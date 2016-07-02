import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
	Navigator,
} from 'react-native';


const Nav = require('./Nav');
const Cog = require('./Cog');


class Test extends Component {

	navigatorRenderScene(route, navigator) {
		console.log(`Routing to: ${route.id} ...`);
		switch (route.id) {
			case 'cog':
				return <Cog navigator={navigator} {...route.passProps} />;
				break;
			case 'nav':
				return <Nav navigator={navigator} {...route.passProps} />;
				break;
		}
	}

	render() {
		console.log('rrrrrrrrrrrrrrrrrrrrrr');

		return (
			<Navigator
				//style={styles.container}
				initialRoute={{id: 'nav', index: 0}}
				renderScene={this.navigatorRenderScene.bind(this)}
			/>
		);
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

AppRegistry.registerComponent('Test', () => Test);

