import { Radio, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

interface RadioButtonProps extends Props<typeof Radio> {}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
	return (
		<View paddingHorizontal='m'>
			<Radio {...props} />
		</View>
	);
};

export default RadioButton;
