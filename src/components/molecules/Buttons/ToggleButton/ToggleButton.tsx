import { Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
	interpolateColor,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { colorScheme } from './shared';

interface ToggleButtonProps {
	value: boolean;
	text: string;
	inactiveText?: string;
	icon?: IconNames;
	inactiveIcon?: IconNames;
	onPress: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
	value,
	text,
	inactiveText,
	icon,
	inactiveIcon,
	onPress
}) => {
	const { theme, mode } = useTheme();

	const animatedValue = useSharedValue<number>(value ? 1 : 0);

	useEffect(() => {
		animatedValue.value = withTiming(animatedValue.value === 1 ? 0 : 1, {
			duration: 200
		});
	}, [value]);

	const animatedContainerStyles = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				animatedValue.value,
				[0, 1],
				[
					theme.colors[colorScheme[mode].inactive.background],
					theme.colors[colorScheme[mode].active.background]
				]
			),
			borderColor: interpolateColor(
				animatedValue.value,
				[0, 1],
				[
					theme.colors[colorScheme[mode].inactive.border],
					theme.colors[colorScheme[mode].active.border]
				]
			)
		};
	}, [mode]);

	const animatedTextStyles = useAnimatedProps(() => {
		return {
			color: interpolateColor(
				animatedValue.value,
				[0, 1],
				[
					theme.colors[colorScheme[mode].inactive.text],
					theme.colors[colorScheme[mode].active.text]
				]
			)
		};
	}, [mode]);

	const animatedIconStyles = useAnimatedProps(() => {
		return {
			fill: interpolateColor(
				animatedValue.value,
				[0, 1],
				[
					theme.colors[colorScheme[mode].inactive.icon],
					theme.colors[colorScheme[mode].active.icon]
				]
			)
		};
	}, [mode]);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View animated style={[styles.container, animatedContainerStyles]}>
				<Text animated variant='paragraph' style={animatedTextStyles}>
					{inactiveText && value === false ? inactiveText : text}
				</Text>
				{icon && value === true && (
					<View marginLeft='xs'>
						<Icon
							animated
							name={icon}
							size='small'
							animatedPathProps={animatedIconStyles}
						/>
					</View>
				)}
				{inactiveIcon && value === false && (
					<View marginLeft='xs'>
						<Icon
							animated
							name={inactiveIcon}
							size='small'
							animatedPathProps={animatedIconStyles}
						/>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 0.3,
		borderRadius: 100,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 55
	}
});

export default ToggleButton;
