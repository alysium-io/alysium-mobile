import { Icon, Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { IconNames } from '@svg';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
	interpolateColor,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface LargeSelectableItemProps {
	text: string;
	icon: IconNames;
	selected: boolean;
	onPress: () => void;
}

const LargeSelectableItem: React.FC<LargeSelectableItemProps> = ({
	text,
	icon,
	selected,
	onPress
}) => {
	const { theme, mode } = useTheme();

	useEffect(() => {
		if (selected) {
			setAnimatedValue(1);
		} else {
			setAnimatedValue(0);
		}
	}, [selected]);

	const animated = useSharedValue<number>(0);
	const setAnimatedValue = (value: number) =>
		(animated.value = withTiming(value, { duration: 100 }));

	const animatedContainerStyles = useAnimatedStyle(() => {
		return {
			borderColor: interpolateColor(
				animated.value,
				[0, 1],
				[theme.colors.bg2, theme.colors.t2]
			)
		};
	}, [mode]);

	const animatedTextStyles = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				animated.value,
				[0, 1],
				[theme.colors.t3, theme.colors.t1]
			)
		};
	}, [mode]);

	const animatedIconProps = useAnimatedProps(() => {
		return {
			fill: interpolateColor(
				animated.value,
				[0, 1],
				[theme.colors.t3, theme.colors.t2]
			)
		};
	}, [mode]);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				padding='m'
				animated
				style={[styles.container, animatedContainerStyles]}
			>
				<Icon
					animated
					animatedPathProps={animatedIconProps}
					name={icon}
					size='xlarge'
				/>
				<Text variant='paragraph-large' animated style={animatedTextStyles}>
					{text}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		aspectRatio: 1.2,
		borderRadius: 10,
		borderWidth: 1,
		justifyContent: 'space-between'
	}
});

export default LargeSelectableItem;
