import { ActivityIndicator, Text, View } from '@atomic';
import { Vibrator } from '@etc';
import { useTheme } from '@hooks';
import { Props, SemanticColor } from '@types';
import React, { useMemo } from 'react';
import { Case, Default, Switch } from 'react-if';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonTextContent from './components/ButtonTextContent';
import Container from './components/Container';
import Success from './components/Success';
import { ButtonState } from './useButtonState';

export type ButtonThemeSettings = {
	backgroundColor: SemanticColor;
	textColor: SemanticColor;
	borderColor: SemanticColor;
	borderWidth: number;
	activityIndicatorColor: SemanticColor;
};

export interface ButtonProps
	extends Omit<Props<typeof ButtonTextContent>, 'textColor'> {
	onPress?: () => void;
	buttonState?: ButtonState;
	color?: 'default' | 'p' | 's' | 't' | 'q';
	variant?: 'solid' | 'outlined';
	buttonThemeSettings?: Partial<ButtonThemeSettings>;
	containerProps?: Omit<Props<typeof Container>, 'settings'>;
}

const Button: React.FC<ButtonProps> = ({
	text,
	onPress = () => console.log('I am a button :)'),
	buttonState = 'active',
	color = 'default',
	variant = 'solid',
	buttonThemeSettings,
	textProps,
	beforeIconProps,
	afterIconProps,
	containerProps
}) => {
	const { theme } = useTheme();

	const settings = useMemo((): ButtonThemeSettings => {
		const activityIndicatorColor =
			`button.${variant}.loading.activity-indicator` as SemanticColor;

		if (buttonState === 'disabled') {
			return Object.assign(
				{
					backgroundColor: `button.${variant}.disabled.bg` as SemanticColor,
					textColor: `button.${variant}.disabled.text` as SemanticColor,
					borderColor:
						variant === 'outlined'
							? (`button.${variant}.disabled.border` as SemanticColor)
							: ('transparent' as SemanticColor),
					borderWidth: theme.borderWidth.thick,
					activityIndicatorColor
				},
				buttonThemeSettings
			);
		} else if (buttonState === 'loading') {
			return Object.assign(
				{
					backgroundColor:
						variant === 'solid'
							? (`button.${variant}.loading.bg` as SemanticColor)
							: ('transparent' as SemanticColor),
					textColor: `button.${variant}.loading.text` as SemanticColor,
					borderColor:
						variant === 'outlined'
							? (`button.${variant}.loading.border` as SemanticColor)
							: ('transparent' as SemanticColor),
					borderWidth: theme.borderWidth.thick,
					activityIndicatorColor
				},
				buttonThemeSettings
			);
		} else if (buttonState === 'success') {
			return Object.assign(
				{
					backgroundColor: `button.${variant}.success.bg` as SemanticColor,
					textColor: `button.${variant}.success.text` as SemanticColor,
					borderColor:
						variant === 'outlined'
							? (`button.${variant}.success.border` as SemanticColor)
							: ('transparent' as SemanticColor),
					borderWidth: theme.borderWidth.thick,
					activityIndicatorColor
				},
				buttonThemeSettings
			);
		} else {
			return Object.assign(
				{
					backgroundColor:
						`button.${variant}.active.bg.${color}` as SemanticColor,
					textColor: `button.${variant}.active.text.${color}` as SemanticColor,
					borderColor:
						variant === 'outlined'
							? (`button.${variant}.active.border.${color}` as SemanticColor)
							: ('transparent' as SemanticColor),
					borderWidth: theme.borderWidth.thick,
					activityIndicatorColor
				},
				buttonThemeSettings
			);
		}
	}, [buttonState, color, variant, buttonThemeSettings, theme]);

	const _onPress = () => {
		Vibrator.medium();
		onPress();
	};

	return (
		<TouchableOpacity
			onPress={_onPress}
			disabled={buttonState !== 'active'}
			activeOpacity={0.9}
		>
			<Container
				borderWidth={settings.borderWidth}
				borderColor={settings.borderColor}
				settings={settings}
				{...containerProps}
			>
				<Switch>
					<Case condition={buttonState === 'loading'}>
						<View position='absolute'>
							<ActivityIndicator color={settings.activityIndicatorColor} />
						</View>
						<Text color='transparent'>Placeholder Text</Text>
					</Case>
					<Case condition={buttonState === 'success'}>
						<Success settings={settings} />
					</Case>
					<Default>
						<ButtonTextContent
							text={text}
							textColor={settings.textColor}
							textProps={textProps}
							beforeIconProps={beforeIconProps}
							afterIconProps={afterIconProps}
						/>
					</Default>
				</Switch>
			</Container>
		</TouchableOpacity>
	);
};

export default Button;
