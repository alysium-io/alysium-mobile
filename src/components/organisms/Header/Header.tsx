import { View } from '@atomic';
import { useTheme } from '@hooks';
import { IChildrenProps, Props } from '@types';
import React from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBackground from './HeaderBackground';

type HeaderProps = Props<typeof Animated.View> & IChildrenProps;

const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	return (
		<View
			animated
			layout={LinearTransition.duration(300)}
			style={{ paddingTop: insets.top }}
			borderColor='border.light'
			borderBottomWidth={theme.borderWidth.normal}
			zIndex={999}
			{...props}
		>
			<HeaderBackground />
			{children}
		</View>
	);
};

export default Header;
