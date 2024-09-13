import { View } from '@atomic';
import { IconNames } from '@svg';
import { SemanticColor } from '@types';
import React from 'react';
import ButtonIcon from './ButtonIcon';
import ButtonLoading from './ButtonLoading';
import ButtonText from './ButtonText';
import { ButtonState } from './shared';

interface ButtonForegroundProps {
	buttonState: ButtonState;
	text: string;
	textColor: SemanticColor;
	icon?: IconNames;
}

const ButtonForeground: React.FC<ButtonForegroundProps> = ({
	buttonState,
	text,
	textColor,
	icon
}) => {
	if (buttonState === 'loading') {
		return <ButtonLoading />;
	}

	return (
		<View flexDirection='row' alignItems='center'>
			<ButtonText text={text} color={textColor} />
			<ButtonIcon icon={icon} color={textColor} />
		</View>
	);
};

export default ButtonForeground;
