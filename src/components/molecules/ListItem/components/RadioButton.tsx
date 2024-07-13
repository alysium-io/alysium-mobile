import { Radio, View } from '@atomic';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface RadioButtonProps {
	active: boolean;
	onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ active, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View padding='m'>
				<Radio active={active} />
			</View>
		</TouchableWithoutFeedback>
	);
};

export default RadioButton;
