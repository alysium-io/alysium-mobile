import { View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeName } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { accentColors } from 'src/restyle/colors/palettes';
import ColorChoice from './components/ColorChoice';

const ThemePicker = () => {
	const { themeName: activeThemeName, setThemeName } = useTheme();
	const onPress = (newThemeName: ThemeName) => setThemeName(newThemeName);
	return (
		<View
			margin='m'
			style={styles.container}
			flexDirection='row'
			flexWrap='wrap'
		>
			{Object.keys(accentColors).map((themeName, idx) => (
				<View margin='m' key={idx}>
					<ColorChoice
						themeName={themeName as ThemeName}
						active={themeName === activeThemeName}
						onPress={onPress}
					/>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	color: {
		height: 100,
		width: 100,
		backgroundColor: 'red'
	}
});

export default ThemePicker;
