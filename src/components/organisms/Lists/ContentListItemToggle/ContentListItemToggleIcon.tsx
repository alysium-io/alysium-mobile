import { View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeMode } from '@types';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated';

interface ContentListItemToggleIconProps {
	checked: boolean;
	onPress?: () => void;
}

const ContentListItemToggleIcon: React.FC<ContentListItemToggleIconProps> = ({
	checked,
	onPress
}) => {
	useEffect(() => {
		if (checked) {
			fadeInAndGrow();
		} else {
			fadeOutAndShrink();
		}
	}, [checked]);

	const { mode, getRawColor } = useTheme();

	const color = mode === ThemeMode.dark ? 'ion' : 'ion_dark';

	const opacity = useSharedValue(0);
	const scale = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{ scale: scale.value }]
		};
	});

	const fadeInAndGrow = () => {
		opacity.value = withTiming(1, { duration: 400 });
		scale.value = withSpring(1, { damping: 19, stiffness: 200 });
	};

	const fadeOutAndShrink = () => {
		opacity.value = withTiming(0, { duration: 400 });
		scale.value = withSpring(0, { damping: 19, stiffness: 200 });
	};

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View padding='m'>
				<View style={[styles.container, { borderColor: getRawColor(color) }]}>
					<View
						animated
						style={[styles.dot, animatedStyles]}
						backgroundColor={color}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 25,
		width: 25,
		borderRadius: 999,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3
	},
	dot: {
		height: '70%',
		width: '70%',
		borderRadius: 999
	}
});

export default ContentListItemToggleIcon;
