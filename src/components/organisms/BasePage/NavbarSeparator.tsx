import { View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';

interface NavbarSeparatorProps {
	isFooterActive: boolean;
}

const NavbarSeparator: React.FC<NavbarSeparatorProps> = ({
	isFooterActive
}) => {
	const { theme } = useTheme();
	return (
		<View
			style={[
				styles.container,
				{ height: isFooterActive ? 0 : theme.borderWidth.normal }
			]}
			backgroundColor='navbar.border'
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	}
});

export default NavbarSeparator;
