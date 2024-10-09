import { View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps
} from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks';
import { IChildrenProps } from '@types';
import React from 'react';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFullScreenSheet } from './useFullScreenSheet';

interface FullScreenSheetFooterProps
	extends BottomSheetFooterProps,
		IChildrenProps {
	animateFooterWithKeyboard?: boolean;
}

const FullScreenSheetFooter: React.FC<FullScreenSheetFooterProps> = ({
	animateFooterWithKeyboard = true,
	children,
	...props
}) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const { footerLayoutApi, keyboard } = useFullScreenSheet();

	const animatedFooterStyle = useAnimatedStyle(() => {
		if (!animateFooterWithKeyboard) {
			return {};
		}
		const keyboardHeight = keyboard.height.value;
		return {
			transform: [
				{
					translateY: interpolate(
						keyboardHeight,
						[0, 1],
						[0, -keyboardHeight],
						'clamp'
					)
				}
			]
		};
	}, []);

	return (
		<BottomSheetFooter {...props}>
			<View
				animated
				paddingHorizontal='m'
				paddingTop='l'
				flexDirection='row'
				style={[{ paddingBottom: insets.bottom }, animatedFooterStyle]}
				backgroundColor='bg.p'
				borderTopWidth={theme.borderWidth.thin}
				borderColor='border.light'
				onLayout={footerLayoutApi.onLayout}
			>
				{children}
			</View>
		</BottomSheetFooter>
	);
};

export default FullScreenSheetFooter;
