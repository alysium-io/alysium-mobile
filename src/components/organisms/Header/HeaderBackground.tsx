import { BlurView, LinearGradient, View } from '@atomic';
import { Colors } from '@etc';
import { useTheme } from '@hooks';
import { useHeader } from '@organisms';
import React from 'react';
import { StyleSheet } from 'react-native';

const HeaderBackground = () => {
	const { theme } = useTheme();
	const { totalHeaderHeight } = useHeader();

	const backgroundStyle = [styles.background, { height: totalHeaderHeight }];

	return (
		<>
			<LinearGradient
				colors={[
					theme.colors['bg.p'],
					Colors.hex2RGBAString(theme.colors['bg.p'], 0.7)
				]}
				style={backgroundStyle}
			/>
			<BlurView
				blurAmount={25}
				blurType={theme.colors['etc.blur']}
				style={backgroundStyle}
			/>
			<View
				borderBottomWidth={theme.borderWidth.normal}
				borderBottomColor='navbar.border'
				style={backgroundStyle}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: '100%'
	}
});

export default HeaderBackground;
