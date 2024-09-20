import { View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps
} from '@gorhom/bottom-sheet';
import { LayoutApi, useTheme } from '@hooks';
import { IChildrenProps } from '@types';
import React from 'react';
import {
	AnimatedKeyboardInfo,
	interpolate,
	useAnimatedStyle
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FullScreenSheetFooterProps
	extends BottomSheetFooterProps,
		IChildrenProps {
	animateFooterWithKeyboard?: boolean;
	layoutApi: LayoutApi;

	/**
	 * NOTE:
	 * Yes we do have to pass the animated keyboard in here like this.
	 * For some reason, if we try to host it inside this component, if we try to re-render
	 * the component, the keyboard height gets set back to 0 during the rerender. And if
	 * the keyboard is open when that happens, it looks like the footer disappears.
	 * But this is not that big of a deal...
	 */
	animatedKeyboard?: AnimatedKeyboardInfo;
}

const FullScreenSheetFooter: React.FC<FullScreenSheetFooterProps> = ({
	animateFooterWithKeyboard = true,
	animatedKeyboard,
	layoutApi,
	children,
	...props
}) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();

	const animatedFooterStyle = useAnimatedStyle(() => {
		if (!animateFooterWithKeyboard || !animatedKeyboard) {
			return {};
		}
		const keyboardHeight = animatedKeyboard.height.value;
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
				onLayout={layoutApi.onLayout}
			>
				{children}
			</View>
		</BottomSheetFooter>
	);
};

export default FullScreenSheetFooter;
