import { BlurView, LView } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface HeaderBackgroundProps {
	withBlur?: boolean;
}

const HeaderBackground: React.FC<HeaderBackgroundProps> = ({
	withBlur = true
}) => {
	const { themeMode } = useTheme();

	if (withBlur) {
		return (
			<BlurView
				blurAmount={25}
				style={styles.background}
				blurType={
					themeMode === ThemeMode.dark
						? 'chromeMaterialDark'
						: 'chromeMaterialLight'
				}
			/>
		);
	}

	if (themeMode === ThemeMode.light) {
		return <LView style={styles.background} backgroundColor='bg.p' />;
	}

	if (themeMode === ThemeMode.dark) {
		return <LView style={styles.background} backgroundColor='bg.p' />;
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
