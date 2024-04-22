import { View } from '@atomic';
import { useTheme } from '@hooks';
import { useBasePage } from '@organisms';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

interface FooterProps {
	children?: React.ReactNode;
	containerProps?: React.ComponentProps<typeof View>;
	backgroundColor?: string;
}

const Footer: React.FC<FooterProps> = ({
	children,
	containerProps,
	backgroundColor = 'bg1'
}) => {
	const { getRawColor } = useTheme();
	const { setIsFooterActive } = useBasePage();

	useEffect(() => {
		setIsFooterActive(true);
		return () => setIsFooterActive(false);
	});

	return (
		<View
			style={[styles.container, { borderTopColor: getRawColor('bg2') }]}
			{...containerProps}
			backgroundColor={backgroundColor}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		borderTopWidth: 0.5,
		zIndex: 1
	}
});

export default Footer;
