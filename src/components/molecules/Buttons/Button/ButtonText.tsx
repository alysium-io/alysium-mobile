import { Text } from '@atomic';
import React from 'react';

interface ButtonTextProps {
	text: string;
	color: string;
}

const ButtonText: React.FC<ButtonTextProps> = ({ text, color }) => {
	return (
		<Text
			animated
			variant='paragraph-small-bold'
			style={{ letterSpacing: 0.5 }}
			color={color}
		>
			{text}
		</Text>
	);
};

export default ButtonText;
