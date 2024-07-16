import { Text, View } from '@atomic';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

interface StatsItemProps {
	title: string;
	subtitle: string;
	onPress: () => void;
}

const StatsItem: React.FC<StatsItemProps> = ({ title, subtitle, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View alignItems='center'>
				<Text variant='paragraph-medium'>{title}</Text>
				<Text variant='paragraph-small'>{subtitle}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default StatsItem;
