import { Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const colorScheme = {
	[ThemeMode.dark]: 'ion_light',
	[ThemeMode.light]: 'ion_dark'
};

interface OpenLinksButtonProps {
	onPress: () => void;
}

const OpenLinksButton: React.FC<OpenLinksButtonProps> = ({ onPress }) => {
	const { mode } = useTheme();

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<Icon name='link' color={colorScheme[mode]} size='small' />
				<Text variant='paragraph' color={colorScheme[mode]} marginLeft='s'>
					Links
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});

export default OpenLinksButton;
