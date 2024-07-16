import { Colors } from '@etc';
import { useTheme } from '@hooks';
import {
	ButtonColorConfig,
	ButtonColorVariants,
	ButtonState,
	ButtonVariants,
	colorScheme,
	disabledColorScheme
} from './shared';

interface IUseButton {
	backgroundColor: string;
	borderColor: string;
	textColor: string;
}

const useButton = (
	buttonColorConfig: Partial<ButtonColorConfig>,
	buttonState: ButtonState,
	variant: ButtonVariants,
	colorVariant: ButtonColorVariants
): IUseButton => {
	const { getRawColor, theme } = useTheme();

	const background =
		buttonColorConfig.bg !== undefined
			? getRawColor(buttonColorConfig.bg)
			: getRawColor(colorScheme[variant][colorVariant].bg);
	const borderColor =
		buttonColorConfig.borderColor !== undefined
			? getRawColor(buttonColorConfig.borderColor)
			: getRawColor(colorScheme[variant][colorVariant].borderColor);
	const textColor =
		buttonColorConfig.text !== undefined
			? buttonColorConfig.text
			: colorScheme[variant][colorVariant].text;

	const getBackgroundColor = () => {
		if (buttonState === 'default') return background;
		if (buttonState === 'disabled')
			return getRawColor(disabledColorScheme[variant].bg);
		return getBackgroundColorDark();
	};

	const getBackgroundColorDark = () => {
		return Colors.darken(background, 0.3);
	};

	const getBorderColor = () => {
		if (buttonState === 'default') return borderColor;
		if (buttonState === 'disabled')
			return getRawColor(disabledColorScheme[variant].borderColor);
		return getBackgroundColorDark();
	};

	const getTextColor = () => {
		if (buttonState === 'disabled') return disabledColorScheme[variant].text;
		return textColor;
	};

	return {
		backgroundColor: getBackgroundColor(),
		borderColor: getBorderColor(),
		textColor: getTextColor()
	};
};

export default useButton;
