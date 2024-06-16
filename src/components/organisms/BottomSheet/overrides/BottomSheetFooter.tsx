import { View } from '@atomic';
import React from 'react';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetFooterProps {
	children?: React.ReactNode;
}

const BottomSheetFooter: React.FC<BottomSheetFooterProps> = ({ children }) => {
	const insets = useSafeAreaInsets();
	const keyboardPosition = useAnimatedKeyboard();

	const animatedPosition = useAnimatedStyle(() => {
		return {
			bottom: insets.bottom + keyboardPosition.height.value
		};
	}, [keyboardPosition.height.value, insets.bottom]);

	return (
		<View animated style={animatedPosition}>
			{children}
		</View>
	);
};

export default BottomSheetFooter;
