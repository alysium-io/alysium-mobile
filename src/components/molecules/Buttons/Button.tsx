import { ActivityIndicator } from '@atomic';
import { useTheme } from '@hooks';
import { SemanticColor } from '@types';
import React, { useMemo } from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Container from './components/Container';
import Content from './components/Content';

type ButtonThemeSettings = {
	backgroundColor: SemanticColor;
	textColor: SemanticColor;
	borderColor: SemanticColor;
	borderWidth: number;
	activityIndicatorColor: SemanticColor;
};

interface ButtonProps {
	text: string;
	onPress?: () => void;
	buttonState?: 'active' | 'loading' | 'disabled';
	color?: 'default' | 'p' | 's' | 't' | 'q';
	variant?: 'solid' | 'outlined';
	buttonThemeSettings?: Partial<ButtonThemeSettings>;
	buttonContent?: React.ComponentProps<typeof Content>;
}

const Button: React.FC<ButtonProps> = ({
	text,
	onPress = () => console.log('I am a button :)'),
	buttonState = 'active',
	color = 'default',
	variant = 'solid',
	buttonThemeSettings,
	buttonContent
}) => {
	const { theme } = useTheme();

	const settings = useMemo((): ButtonThemeSettings => {
		const borderWidth = variant === 'outlined' ? theme.borderWidth.thick : 0;
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
					borderWidth,
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
					borderWidth,
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
					borderWidth,
					activityIndicatorColor
				},
				buttonThemeSettings
			);
		}
	}, [buttonState, color, variant, buttonThemeSettings, theme]);

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={buttonState === 'disabled' || buttonState === 'loading'}
			activeOpacity={0.9}
		>
			<Container
				backgroundColor={settings.backgroundColor}
				borderWidth={settings.borderWidth}
				borderColor={settings.borderColor}
			>
				<If condition={buttonState === 'loading'}>
					<Then>
						<ActivityIndicator color={settings.activityIndicatorColor} />
					</Then>
					<Else>
						<Content
							color={settings.textColor}
							variant='paragraph-small-medium'
							{...buttonContent}
						>
							{text}
						</Content>
					</Else>
				</If>
			</Container>
		</TouchableOpacity>
	);
};

export default Button;
