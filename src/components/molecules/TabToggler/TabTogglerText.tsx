import { Text, View } from '@atomic';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

interface TabTogglerTextProps {
	text: string;
	isActive: boolean;
	onPress: () => void;
}

const TabTogglerText: React.FC<TabTogglerTextProps> = ({
	text,
	isActive,
	onPress
}) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View flex={1}>
				<Text
					margin='s'
					textAlign='center'
					color={isActive ? 'text.p' : 'text.negative.p'}
					variant={isActive ? 'paragraph-small-bold' : 'paragraph-small'}
				>
					{text}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default TabTogglerText;
