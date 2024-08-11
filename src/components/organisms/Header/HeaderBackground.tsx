import { BlurView, View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

const HeaderBackground = () => {
	const { theme, themeMode } = useTheme();

	if (themeMode === ThemeMode.light) {
		return (
			<BlurView
				blurAmount={25}
				blurType={theme.colors['etc.blur']}
				style={styles.background}
			/>
		);
	}

	if (themeMode === ThemeMode.dark) {
		return <View style={styles.background} backgroundColor='bg.p' />;
	}

	return null;
};

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

export default HeaderBackground;
