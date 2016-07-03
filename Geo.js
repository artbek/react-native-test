import React, { Component } from 'react';

import {
	StyleSheet,
  Text,
  View,
	TouchableHighlight,
	ScrollView,
	RefreshControl,
} from 'react-native';


module.exports = class Geo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			counter: 0,
			refreshing: false,
			initialPosition: {
				coords: { longitude: '(tap to refresh)', latitude: '(tap to refresh)', },
			},
		};
	}

	_onRefresh() {
		this.setState({refreshing: true});

		this.state.counter++;
		this.setState({
			counter: this.state.counter,
		});
		//console.log(`onrefresh ${this.state.counter}`);

		this.setState({refreshing: false});
	}

	_refreshGeo() {
		//console.log("geo");
		this.setState({refreshing: true});
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({initialPosition: position});
				this.setState({refreshing: false});
			},
			(error) => {
				console.error(`Geo Error: ${error.message}`);
				this.setState({refreshing: false});
			},
			{enableHighAccuracy: false, timeout: 2000, maximumAge: 1000}
		);
	}

	render() {
    return (
      <ScrollView
				contentContainerStyle={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
					/>
				}
				scrollEventThrottle={200}
			>

				<Text style={styles.counter}>
					Refresh counter: {this.state.counter}
				</Text>

				<Text style={styles.geo} onPress={this._refreshGeo.bind(this)}>
					Lon: {this.state.initialPosition.coords.longitude} {'\n'}
					Lat: {this.state.initialPosition.coords.latitude}
				</Text>

      </ScrollView>
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
  counter: {
    fontSize: 30,
		color: '#ffffff',
  },
  geo: {
		color: '#ffffff',
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
});

