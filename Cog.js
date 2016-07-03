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

		this.DOUBLE_PI = Math.PI * 2;

		var {
			height: deviceHeight,
			width: deviceWidth,
		} = Dimensions.get('window');

		this.state = {
			revolutionsCounter: 0,
			deviceHeight,
			deviceWidth,
			_animatedValue: new Animated.Value(0),
			savedRotation: 0,
			savedX: 0,
			savedY: 0,
			textAnimatedValue: new Animated.Value(0),
		};


		this._temp_counter = 0;

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
					var { moveX, moveY } = gestureState;
					this.state._animatedValue.setValue(this._getAngle(moveX, moveY));
					// and save new rotation
					this.setState({
						savedRotation: this.state._animatedValue._value,
						savedX: moveX,
						savedY: moveY,
					});

			},
			onPanResponderRelease: (evt, gestureState) => {
				//console.log("release");
			},
			onPanResponderGrant: (evt, gestureState) => {
				var { x0, y0 } = gestureState;
				this.setState({
					savedRotation: this.state._animatedValue._value,
					savedX: x0,
					savedY: y0,
				});
			},
		});
	}

	_getAngle(x1, y1) {
		x0 = this.state.savedX - 200;
		y0 = this.state.savedY - 200;
		x1 -= 200;
		y1 -= 200;

		//console.log(`[${x0}, ${y0}] - [${x1}, ${y1}]`);
		var tan0 = Math.atan2(x0, y0);
		var tan1 = Math.atan2(x1, y1);
		if (tan0 < 0) tan0 = this.DOUBLE_PI + tan0;
		if (tan1 < 0) tan1 = this.DOUBLE_PI + tan1;

		var relativeAngle = tan0 - tan1;
		//console.log("Relative angle: " + relativeAngle);

		var newRotation = this.state.savedRotation + relativeAngle;
		//console.log("New rotation: " + newRotation);

		if (newRotation < 1 && newRotation > -1) {
			if (this.state.savedRotation < 0 && newRotation > 0) {
				this.setState({
					revolutionsCounter: ++this.state.revolutionsCounter,
				});
			} else if (this.state.savedRotation > 0 && newRotation < 0) {
				this.setState({
					revolutionsCounter: --this.state.revolutionsCounter,
				});
			}
		}

		return newRotation;
	}


	_resetCounter() {
		Animated.parallel([
			Animated.sequence([
				Animated.timing(
					this.state.textAnimatedValue,
					{ toValue: 0.8, duration: 50 }
				),
				Animated.spring(
					this.state.textAnimatedValue,
					{ toValue: 1, friction: 4, }
				)
			]),
			Animated.timing(
				this.state._animatedValue,
				{ toValue: 0, duration: 1500 }
			),
		]).start();

		this.setState({
			revolutionsCounter: 0,
		});
	}


  render() {

		var interpolatedRotateAnimation = this.state._animatedValue.interpolate({
			inputRange: [0, this.DOUBLE_PI],
			outputRange: ['0deg', '360deg']
		});

		var interpolateTextAnimation = this.state.textAnimatedValue.interpolate({
			inputRange: [0, 10],
			outputRange: [0, 10]
		});

    return (
      <ScrollView
				contentContainerStyle={styles.container}
			>

				<Animated.Image
					{...this._panResponder.panHandlers}
					source={require('./propeller.png')}
					style={{
						flex: 1,
						position: 'absolute',
						left: this.state.deviceWidth / 2 - 200,
						top: 0,
						transform: [ {rotate: interpolatedRotateAnimation} ]
					}}
				/>

				<Animated.Text
					style={{
						fontSize: 30,
						padding: 10,
						paddingBottom: 60,
						color: '#333333',
						transform: [ { scale: interpolateTextAnimation } ],
					}}
					onPress={this._resetCounter.bind(this)}
				>
					Revolutions: {this.state.revolutionsCounter}
				</Animated.Text>

      </ScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  nav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#333344',
  },
  counter: {
    fontSize: 30,
		padding: 10,
		paddingBottom: 60,
		color: '#333333',
  },
});
