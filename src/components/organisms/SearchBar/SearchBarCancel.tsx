import { Text, View } from '@atomic';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FadeIn } from 'react-native-reanimated';

interface SearchBarCancelProps {
	onPress: () => void;
}

const SearchBarCancel: React.FC<SearchBarCancelProps> = ({ onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				animated
				entering={FadeIn.delay(200).duration(200)}
				exiting={FadeIn.delay(200).duration(200)}
				padding='s'
			>
				<Text variant='paragraph-small' color='t1'>
					Cancel
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SearchBarCancel;
