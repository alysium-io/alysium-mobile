import { Text, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface PillListItemProps {
	text: string;
	onPress: () => void;
}

const PillListItem: React.FC<PillListItemProps> = ({ text, onPress }) => {
	const { theme } = useTheme();

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				paddingVertical='s'
				paddingHorizontal='m'
				marginRight='s'
				marginBottom='s'
				style={[styles.container, theme.borders.thin.all]}
			>
				<Text variant='p3-light'>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 25,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default PillListItem;
