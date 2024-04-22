import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

const colorScheme = {
	[ThemeMode.dark]: {
		borderColor: 'bg1',
		iconColor: 'bg1',
		backgroundColor: 'white'
	},
	[ThemeMode.light]: {
		borderColor: 't2',
		iconColor: 't2',
		backgroundColor: 'bg1'
	}
};

const EditIcon = () => {
	const { mode, getRawColor } = useTheme();

	return (
		<View
			backgroundColor={colorScheme[mode].backgroundColor}
			style={[
				styles.container,
				{ borderColor: getRawColor(colorScheme[mode].borderColor) }
			]}
		>
			<Icon name='pencil' size='small' color={colorScheme[mode].iconColor} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 1000,
		borderWidth: 2,
		padding: 5
	}
});

export default EditIcon;
