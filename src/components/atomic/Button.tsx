import { ActivityIndicator, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { SemanticColor } from '@types';
import React, { useMemo } from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
}

const Button: React.FC<ButtonProps> = ({
	text,
	onPress = () => console.log('I am a button :)'),
	buttonState = 'active',
	color = 'default',
	variant = 'solid'
}) => {
	const { theme } = useTheme();

	const settings = useMemo((): ButtonThemeSettings => {
		const borderWidth = variant === 'outlined' ? theme.borderWidth.thick : 0;
		const activityIndicatorColor =
			`button.${variant}.loading.activity-indicator` as SemanticColor;

		if (buttonState === 'disabled') {
			return {
				backgroundColor:
					`button.${variant}.disabled.background` as SemanticColor,
				textColor: `button.${variant}.disabled.text` as SemanticColor,
				borderColor:
					variant === 'outlined'
						? (`button.${variant}.disabled.border` as SemanticColor)
						: ('transparent' as SemanticColor),
				borderWidth,
				activityIndicatorColor
			};
		} else if (buttonState === 'loading') {
			return {
				backgroundColor:
					variant === 'solid'
						? (`button.${variant}.loading.background` as SemanticColor)
						: ('transparent' as SemanticColor),
				textColor: `button.${variant}.loading.text` as SemanticColor,
				borderColor:
					variant === 'outlined'
						? (`button.${variant}.loading.border` as SemanticColor)
						: ('transparent' as SemanticColor),
				borderWidth,
				activityIndicatorColor
			};
		} else {
			return {
				backgroundColor:
					`button.${variant}.active.background.${color}` as SemanticColor,
				textColor: `button.${variant}.active.text.${color}` as SemanticColor,
				borderColor:
					variant === 'outlined'
						? (`button.${variant}.active.border.${color}` as SemanticColor)
						: ('transparent' as SemanticColor),
				borderWidth,
				activityIndicatorColor
			};
		}
	}, [buttonState, color, variant]);

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={buttonState === 'disabled' || buttonState === 'loading'}
			activeOpacity={0.9}
		>
			<View
				backgroundColor={settings.backgroundColor}
				borderWidth={settings.borderWidth}
				borderColor={settings.borderColor}
				flexDirection='row'
				alignItems='center'
				justifyContent='center'
				borderRadius='round'
				padding='m'
			>
				<If condition={buttonState === 'loading'}>
					<Then>
						<ActivityIndicator color={settings.activityIndicatorColor} />
					</Then>
					<Else>
						<Text color={settings.textColor} variant='paragraph-small-medium'>
							{text}
						</Text>
					</Else>
				</If>
			</View>
		</TouchableOpacity>
	);
};

export default Button;
