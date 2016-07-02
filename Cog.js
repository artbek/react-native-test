import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
	Linking,
	RefreshControl,
	Vibration,
	Animated,
	Image,
	PanResponder,
	Dimensions,
	TouchableHighlight,
} from 'react-native';


module.exports = class Cog extends Component {

	constructor(props) {
		super(props);
		Vibration.vibrate();
		console.log("cccccccccccccccccccccccccccc");

		var {
			height: deviceHeight,
			width: deviceWidth,
		} = Dimensions.get('window');

		this.state = {
			counter: 0,
			refreshing: false,
			initialPosition: {
				coords: { longitude: '(tap to refresh)', latitude: '(tap to refresh)', },
			},
			deviceHeight,
			deviceWidth,
			_animatedValue: new Animated.Value(0),
			savedRotation: 0,
		};

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				var { x0, y0, moveX, moveY } = gestureState;
				this.state._animatedValue.setValue(this._getAngle(x0, y0, moveX, moveY));
			},
			onPanResponderRelease: (evt, gestureState) => {
				//console.log("release");
			},
			onPanResponderGrant: (evt, gestureState) => {
				console.log("grant");
				// save current rotation
				this.setState({
					savedRotation: this.state._animatedValue._value,
				});
			},
		});
	}

	_getAngle(x0, y0, x1, y1) {
		x0 -= 200;
		x1 -= 200;
		y0 -= 200;
		y1 -= 200;
		//console.log(`[${x0}, ${y0}] - [${x1}, ${y1}]`); console.log(Math.atan(x0 / y0)); console.log(Math.atan(x1 / y1));
		//if ((y0 > 0 && y1 < 0) || (y0 < 0 && y1 > 0)) {
		var relativeAngle = Math.atan(x0 / y0) - Math.atan(x1 / y1);
		//console.log(relativeAngle);
		var newAngle = this.state.savedRotation + relativeAngle;
		//console.log(newAngle);
		return newAngle;
	}

	refreshGeo() {
		console.log("geo");
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({initialPosition: position});
			},
			(error) => console.error(`Geo Error: ${error.message}`),
			{enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
		);
	}

	_onRefresh() {
		this.setState({refreshing: true});

		this.state.counter++;
		this.setState({
			counter: this.state.counter,
		});
		console.log(`onrefresh ${this.state.counter}`);

		this.setState({refreshing: false});
	}

  render() {

		var interpolatedRotateAnimation = this.state._animatedValue.interpolate({
			inputRange: [-3.14, 3.14],
			outputRange: ['0deg', '360deg']
		});

    return (
      <ScrollView
				{...this._panResponder.panHandlers}
				contentContainerStyle={styles.container}
				/*
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}
					/>
				}
				*/
				onScroll={() => { console.log('onScroll!'); }}
				scrollEventThrottle={200}
			>

				<Text style={styles.counter}>
					Counter: {this.state.counter}
				</Text>

				<Text style={styles.welcome} onPress={this.refreshGeo.bind(this)}>
					Lon: {this.state.initialPosition.coords.longitude} {'\n'}
					Lat: {this.state.initialPosition.coords.latitude}
				</Text>

				<Animated.Image
					source={require('./propeller.png')}
					style={{
						flex: 1,
						position: 'absolute',
						left: this.state.deviceWidth / 2 - 200,
						top: 0,
						transform: [ {rotate: interpolatedRotateAnimation} ]
					}}
				/>

				<TouchableHighlight
					onPress={() => this._navigate('nav')}
					style={styles.nav}
				>
					<Text>Menu</Text>
				</TouchableHighlight>

      </ScrollView>
    );
  }

	_navigate(property) {
		this.props.navigator.push({
			id: property
		});
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
  nav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#333344',
  },
  welcome: {
		color: '#ffffff',
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
});
