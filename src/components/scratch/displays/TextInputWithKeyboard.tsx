import React, { useState } from 'react';
import {
	Animated,
	Keyboard,
	KeyboardEvent,
	Platform,
	StyleSheet,
	TextInput,
	View
} from 'react-native';

function KeyboardAwareInput() {
	const [bottomOffset] = useState(new Animated.Value(0));

	React.useEffect(() => {
		const showSubscription = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
			(event: KeyboardEvent) => {
				Keyboard.scheduleLayoutAnimation(event);
				Animated.timing(bottomOffset, {
					toValue: event.endCoordinates.height,
					duration: event.duration || 250,
					useNativeDriver: false
				}).start();
			}
		);

		const hideSubscription = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
			(event: KeyboardEvent) => {
				Keyboard.scheduleLayoutAnimation(event);
				Animated.timing(bottomOffset, {
					toValue: 0,
					duration: event.duration || 250,
					useNativeDriver: false
				}).start();
			}
		);

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, [bottomOffset]);

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.inputContainer,
					{
						transform: [
							{
								translateY: bottomOffset.interpolate({
									inputRange: [0, 1000],
									outputRange: [0, -1000]
								})
							}
						]
					}
				]}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: 'green'
					}}
				/>
				<TextInput
					style={styles.input}
					placeholder='This input will animate with keyboard'
				/>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	inputContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		padding: 10,
		backgroundColor: 'white'
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 5
	}
});

export default KeyboardAwareInput;
