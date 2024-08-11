import { View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

type FooterProps = Props<typeof View> & {
	backgroundColor?: string;
	setIsFooterActive: (isFooterActive: boolean) => void;
};

const Footer: React.FC<FooterProps> = ({
	backgroundColor = 'bg.p',
	setIsFooterActive,
	...props
}) => {
	const { theme } = useTheme();

	useEffect(() => {
		setIsFooterActive(true);
		return () => setIsFooterActive(false);
	}, []);

	return (
		<View
			borderTopWidth={theme.borderWidth.normal}
			borderColor='border.light'
			style={styles.container}
			backgroundColor={backgroundColor}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1
	}
});

export default Footer;
