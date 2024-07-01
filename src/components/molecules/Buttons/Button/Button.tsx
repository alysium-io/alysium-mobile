import { Vibrator } from '@etc';
import { IconNames } from '@svg';
import React from 'react';
import ButtonContainer from './ButtonContainer';
import ButtonForeground from './ButtonForeground';
import {
	ButtonColorConfig,
	ButtonColorVariants,
	ButtonState,
	ButtonVariants
} from './shared';
import useButton from './useButton';

interface ButtonProps {
	onPress: () => void;
	text: string;
	variant: ButtonVariants;
	colorVariant: ButtonColorVariants;
	icon?: IconNames;
	buttonState?: ButtonState;
	disabled?: boolean;
	buttonColorConfig?: Partial<ButtonColorConfig>;
}

const Button: React.FC<Partial<ButtonProps>> = ({
	onPress = () => console.log('I am a button :)'),
	text = 'Press Me',
	variant = 'filled',
	colorVariant = 'default',
	icon,
	buttonState = 'default',
	disabled = false,
	buttonColorConfig = {}
}) => {
	const { borderColor, backgroundColor, textColor } = useButton(
		buttonColorConfig,
		buttonState,
		variant,
		colorVariant
	);

	const _onPress = () => {
		onPress();
		Vibrator.clockTick();
	};

	return (
		<ButtonContainer
			onPress={_onPress}
			isDisabled={buttonState !== 'default' || disabled}
			borderColor={borderColor}
			backgroundColor={backgroundColor}
		>
			<ButtonForeground
				buttonState={buttonState}
				text={text}
				textColor={textColor}
				icon={icon}
			/>
		</ButtonContainer>
	);
};

export default Button;
