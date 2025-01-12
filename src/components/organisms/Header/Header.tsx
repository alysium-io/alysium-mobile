import { LView, View } from '@atomic';
import { useTheme } from '@hooks';
import { IChildrenProps, Props } from '@types';
import React from 'react';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBackground from './HeaderBackground';

type HeaderProps = Props<typeof Animated.View> &
	Props<typeof View> &
	IChildrenProps & {
		headerBackgroundProps?: Props<typeof HeaderBackground>;
	};

const Header: React.FC<HeaderProps> = ({
	children,
	headerBackgroundProps,
	...props
}) => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	return (
		<LView
			style={{ paddingTop: insets.top }}
			borderColor='border.light'
			borderBottomWidth={theme.borderWidth.normal}
			zIndex={999}
			{...props}
		>
			<HeaderBackground {...headerBackgroundProps} />
			{children}
		</LView>
	);
};

export default Header;
