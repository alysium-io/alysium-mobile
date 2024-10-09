import { View } from '@atomic';
import { useKeyboard, useTheme } from '@hooks';
import { IChildrenProps } from '@types';
import React from 'react';
import Animated from 'react-native-reanimated';
import AnimatedBottomBuffer from './AnimatedBottomBuffer';
import { SelfAwareScrollViewApi } from './useSelfAwareScrollView';

interface SelfAwareScrollViewProps
	extends IChildrenProps,
		Omit<React.ComponentProps<Animated.ScrollView>, 'children'> {
	selfAwareScrollViewApi: SelfAwareScrollViewApi;
	containerProps?: React.ComponentProps<typeof View>;
}

const SelfAwareScrollView: React.FC<SelfAwareScrollViewProps> = ({
	selfAwareScrollViewApi,
	containerProps,
	children,
	...props
}) => {
	const { dismiss } = useKeyboard();
	const { theme } = useTheme();
	return (
		<Animated.ScrollView
			ref={selfAwareScrollViewApi.scrollViewRef}
			onLayout={selfAwareScrollViewApi.onScrollViewLayout}
			onScrollBeginDrag={dismiss}
			style={{ overflow: 'visible' }}
			indicatorStyle={theme.colors['etc.scrollbar-indicator']}
			{...props}
		>
			<View {...containerProps}>{children}</View>
			<AnimatedBottomBuffer
				animatedBottomBlockStyle={
					selfAwareScrollViewApi.animatedBottomBlockStyle
				}
			/>
		</Animated.ScrollView>
	);
};

export default SelfAwareScrollView;
