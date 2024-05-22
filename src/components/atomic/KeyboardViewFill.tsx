import { View } from '@atomic';
import React from 'react';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

const KeyboardViewFill = () => {
	const keyboard = useAnimatedKeyboard();
	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			height: keyboard.height.value
		};
	});

	return <View animated style={animatedContainerStyle} />;
};

export default KeyboardViewFill;
