import { View } from '@atomic';
import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureUpdateEvent,
	PanGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import {
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SheetProps {
	bottomContentHeight: number;
	didCommit: () => void;
	SheetContent?: () => React.JSX.Element;
	onDragUpdate?: (translateY: number) => void;
	onCancelCommit?: () => void;
}

const Sheet: React.FC<SheetProps> = ({
	bottomContentHeight,
	didCommit,
	SheetContent,
	onDragUpdate,
	onCancelCommit
}) => {
	const { height: SCREEN_HEIGHT } = useWindowDimensions();
	const insets = useSafeAreaInsets();

	// This is the sheet handle, we need to define these because we use them in the sheet height calculation
	const DRAG_HANDLE_HEIGHT = 6;
	const DRAG_HANDLE_VERTICAL_MARGIN = 10;
	const DRAG_HANDLE_TOTAL_HEIGHT =
		DRAG_HANDLE_HEIGHT + DRAG_HANDLE_VERTICAL_MARGIN * 2;

	// Sheet Calculations
	const SHEET_HEIGHT_TOP_BUFFER = 500; // this is the "extra" height added to the sheet to make sure it is fully visible
	const SHEET_BOTTOM_MARGIN = 25; // This is the margin between the bottom of the sheet and the content below it (e.g. the "swipe up to submit" text)
	const TRANSLATION_COMMIT_DISTANCE = 220; // This is the distance the sheet needs to be translated to be considered "committed" to open
	const TOTAL_SHEET_HEIGHT =
		SCREEN_HEIGHT -
		bottomContentHeight -
		SHEET_BOTTOM_MARGIN +
		SHEET_HEIGHT_TOP_BUFFER;
	const SHEET_OPEN_Y_POSITION = 0 - SHEET_HEIGHT_TOP_BUFFER; // 0 is the top of the screen
	const SHEET_CLOSED_Y_POSITION = -TOTAL_SHEET_HEIGHT * 1.2;
	const MAX_TRANSLATION = SHEET_HEIGHT_TOP_BUFFER * 0.5; // base this off of the amount of buffer added to the sheet height (because we can't show the absolute top of the sheet)
	const SHEET_INNER_CONTENT_HEIGHT =
		SCREEN_HEIGHT -
		bottomContentHeight -
		SHEET_BOTTOM_MARGIN -
		insets.top -
		DRAG_HANDLE_TOTAL_HEIGHT;

	const translateY = useSharedValue(SHEET_CLOSED_Y_POSITION); // Initial position off the screen
	const context = useSharedValue({ startY: 0 });
	const springConfig = {
		mass: 1,
		damping: 50,
		stiffness: 218,
		overshootClamping: false,
		restDisplacementThreshold: 0.01
	};

	const _onDragUpdate = () => {
		'worklet';
		// Pass the translation distance to the parent component as a percentage
		// that describes how close you are to the "committed" distance
		onDragUpdate &&
			onDragUpdate(
				interpolate(
					translateY.value,
					[
						SHEET_OPEN_Y_POSITION,
						SHEET_OPEN_Y_POSITION - TRANSLATION_COMMIT_DISTANCE
					],
					[1, 0],
					'clamp'
				)
			);
	};

	const gesture = Gesture.Pan()
		.onStart(() => {
			context.value = { startY: translateY.value };
		})
		.onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
			// Prevent the sheet from being dragged too far down
			if (event.translationY < MAX_TRANSLATION) {
				translateY.value = context.value.startY + event.translationY;
				_onDragUpdate();
			}
		})
		.onEnd(() => {
			const distanceTraveled = translateY.value - context.value.startY;
			if (distanceTraveled > -TRANSLATION_COMMIT_DISTANCE) {
				// If the sheet has not been dragged far enough to be considered "committed" to open
				translateY.value = withSpring(SHEET_OPEN_Y_POSITION, springConfig);
				onCancelCommit && onCancelCommit();
			} else {
				// If the sheet has been dragged far enough to be considered "committed" to open
				translateY.value = withSpring(SHEET_CLOSED_Y_POSITION, springConfig);
				runOnJS(didCommit)();
			}
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }]
		};
	});

	useEffect(() => {
		// Animate the sheet to fully open position on mount
		translateY.value = withSpring(SHEET_OPEN_Y_POSITION, springConfig);
	}, []);

	return (
		<GestureDetector gesture={gesture}>
			<View
				animated
				style={[
					{ height: TOTAL_SHEET_HEIGHT },
					styles.bottomSheet,
					animatedStyle
				]}
			>
				{SheetContent && (
					<View
						style={{
							height: SHEET_INNER_CONTENT_HEIGHT
						}}
					>
						<SheetContent />
					</View>
				)}
				<View
					style={[
						styles.dragHandle,
						{
							height: DRAG_HANDLE_HEIGHT,
							marginVertical: DRAG_HANDLE_VERTICAL_MARGIN
						}
					]}
				/>
			</View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({
	bottomSheet: {
		position: 'absolute',
		top: 0,
		width: '100%',
		backgroundColor: 'white',
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
		justifyContent: 'flex-end'
	},
	dragHandle: {
		width: 40,
		borderRadius: 3,
		backgroundColor: 'rgba(200, 200, 200, 0.5)',
		alignSelf: 'center'
	}
});

export default Sheet;
