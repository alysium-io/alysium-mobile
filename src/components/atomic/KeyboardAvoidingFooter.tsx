import { View } from '@atomic';
import React from 'react';
import {
	interpolate,
	useAnimatedKeyboard,
	useAnimatedStyle
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface KeyboardAvoidingFooterProps {
	children?: React.ReactNode;
}

const KeyboardAvoidingFooter: React.FC<KeyboardAvoidingFooterProps> = ({
	children
}) => {
	const insets = useSafeAreaInsets();
	const keyboardPosition = useAnimatedKeyboard();

	const animatedPosition = useAnimatedStyle(() => {
		/**
		 * This is a simple example of how to animate the footer position based on the keyboard position.
		 * Here's the explanation of the interpolation...
		 * 	When the keyboard is not visible, we want the bottom position to higher than the bottom insets
		 *  (insets.bottom) to stay within the safe area.
		 *  However, when we raise the keyboard, and keyboardPosition.height.value increases towards the maximum,
		 *  that insets.bottom value will still push the footer up, so the bottom inset will be keyboardHeight + bottomInset.
		 *  We don't like this aesthetically because it adds way more margin than we need.
		 *  So we basically operate under the assumption that all keyboards will be at least 100 pixels tall, and we say,
		 *  "Hey, as the keyboard raises towards 100, also decrease the bottom inset towards 0, to eliminate the extra margin."
		 */
		return {
			bottom:
				keyboardPosition.height.value +
				interpolate(
					keyboardPosition.height.value,
					[0, 100],
					[insets.bottom, 0],
					'clamp'
				)
		};
	}, [insets.bottom]);

	return (
		<View animated style={animatedPosition}>
			{children}
		</View>
	);
};

export default KeyboardAvoidingFooter;
