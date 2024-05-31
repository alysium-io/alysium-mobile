import { View } from '@atomic';
import React from 'react';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const KeyboardViewFill = () => {
	const keyboard = useAnimatedKeyboard();
	const { bottom } = useSafeAreaInsets();
	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			height: keyboard.height.value + bottom
		};
	}, [bottom]);

	return <View animated style={animatedContainerStyle} />;
};

export default KeyboardViewFill;
