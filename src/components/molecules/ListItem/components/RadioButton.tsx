import { Radio } from '@atomic';
import React from 'react';

interface RadioButtonProps extends React.ComponentProps<typeof Radio> {}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
	return <Radio {...props} />;
};

export default RadioButton;
