import { View } from '@atomic';
import { useTheme } from '@hooks';
import { IChildrenProps, Props } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBackground from './HeaderBackground';

type HeaderProps = Props<typeof View> & IChildrenProps;

const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();

	return (
		<View
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
