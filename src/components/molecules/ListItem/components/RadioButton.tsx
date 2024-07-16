import { Radio, View } from '@atomic';
import React from 'react';

interface RadioButtonProps extends React.ComponentProps<typeof Radio> {}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
	return (
		<View paddingHorizontal='m'>
			<Radio {...props} />
		</View>
	);
};

export default RadioButton;
