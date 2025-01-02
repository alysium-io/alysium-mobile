import { AView } from '@atomic';
import { useNavigation } from '@hooks';
import { ChildrenProps } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import {
	DETATCH_ACTIVATE_BACK_DISTANCE_THRESHOLD,
	DETATCH_ACTIVATE_X_THRESHOLD,
	DETATCH_ACTIVATE_Y_THRESHOLD,
	HORIZONTAL_DETATCH_THRESHOLD,
	OUTER_VIEW_BORDER_RADIUS
} from '../settings';

type DetatchPanResponderProps = ChildrenProps & {};

const DetatchPanResponder: React.FC<DetatchPanResponderProps> = ({
	children
}) => {
	const { back } = useNavigation();
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const isGestureActive = useSharedValue<boolean>(false);

	const panGesture = Gesture.Pan()
		.activeOffsetX([
			-DETATCH_ACTIVATE_X_THRESHOLD,
			DETATCH_ACTIVATE_X_THRESHOLD
		]) // Adjust these values to fine-tune when the gesture activates
		.failOffsetY([-DETATCH_ACTIVATE_Y_THRESHOLD, DETATCH_ACTIVATE_Y_THRESHOLD]) // This will make the handler fail if the movement is more vertical
		.onStart(() => {
			isGestureActive.value = false;
		})
		.onUpdate((event) => {
			if (
				Math.abs(event.translationX) >= HORIZONTAL_DETATCH_THRESHOLD &&
				!isGestureActive.value
			) {
				isGestureActive.value = true;
			}
			if (isGestureActive) {
				translateX.value = event.translationX;
				translateY.value = event.translationY;
			}
		})
		.onEnd(() => {
			// Calculate the x,y distance between where the interaction started and where it ended
			const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

			// If the distance is greater than the threshold, animate the card out of view
			if (distance >= DETATCH_ACTIVATE_BACK_DISTANCE_THRESHOLD) {
				runOnJS(back)();
			} else {
				translateY.value = withTiming(0, { duration: 200 });
				translateX.value = withTiming(0, { duration: 200 });
				isGestureActive.value = false;
			}
		});

	const animatedOuterStyle = useAnimatedStyle(() => {
		const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
		const opacity = interpolate(
			distance,
			[0, DETATCH_ACTIVATE_BACK_DISTANCE_THRESHOLD],
			[1, 0]
		);
		return {
			backgroundColor: `rgba(0, 0, 0, ${opacity})`
		};
	}, []);

	const animatedInnerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value }
			],
			borderRadius: OUTER_VIEW_BORDER_RADIUS
		};
	}, []);

	return (
		<AView style={[animatedOuterStyle, styles.outer]}>
			<GestureDetector gesture={panGesture}>
				<Animated.View style={[animatedInnerStyle, styles.inner]}>
					{children}
				</Animated.View>
			</GestureDetector>
		</AView>
	);
};

const styles = StyleSheet.create({
	outer: {
		borderRadius: OUTER_VIEW_BORDER_RADIUS,
		flex: 1,
		overflow: 'hidden'
	},
	inner: {
		flex: 1,
		overflow: 'hidden'
	}
});

export default DetatchPanResponder;
