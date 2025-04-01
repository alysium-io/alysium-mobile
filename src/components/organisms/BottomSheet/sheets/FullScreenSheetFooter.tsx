import { AView } from '@atomic';
import { SheetApi, useTheme } from '@hooks';
import { ActionButtons } from '@molecules';
import { Props } from '@types';
import React from 'react';
import { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FullScreenSheetFooterProps {
	buttonProps?: Props<typeof ActionButtons>['buttonProps'];
	sheetApi: SheetApi;
}

const FullScreenSheetFooter: React.FC<FullScreenSheetFooterProps> = ({
	sheetApi,
	buttonProps
}) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const keyboard = useAnimatedKeyboard();
	const animatedStyle = useAnimatedStyle(
		() => ({
			transform: [{ translateY: -keyboard.height.value }]
		}),
		[]
	);
	return (
		<AView
			paddingHorizontal='m'
			paddingTop='m'
			backgroundColor='bg.p'
			borderTopWidth={theme.borderWidth.thin}
			borderColor='border.light'
			style={[animatedStyle, { paddingBottom: insets.bottom }]}
		>
			<ActionButtons
				buttonProps={
					buttonProps ?? {
						text: 'Dismiss',
						onPress: sheetApi.close
					}
				}
			/>
		</AView>
	);
};

export default FullScreenSheetFooter;
