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
		//console.log("cccccccccccccccccccccccccccc");

		var {
			height: deviceHeight,
			width: deviceWidth,
		} = Dimensions.get('window');

		this.state = {
			counter: 0,
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
				//console.log("grant");
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



  render() {

		var interpolatedRotateAnimation = this.state._animatedValue.interpolate({
			inputRange: [-3.14, 3.14],
			outputRange: ['0deg', '360deg']
		});

    return (
      <ScrollView
				{...this._panResponder.panHandlers}
				contentContainerStyle={styles.container}
			>

				<Text style={styles.counter}>
					Counter: {this.state.counter}
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
  nav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#333344',
  },
  counter: {
    fontSize: 30,
		color: '#ffffff',
  },
});
