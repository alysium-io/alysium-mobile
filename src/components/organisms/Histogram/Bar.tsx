import { interpolate, RoundedRect } from '@shopify/react-native-skia';
import React, { useEffect } from 'react';
import {
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated';
import { BarData, HistogramSettings } from './settings';

interface BarProps {
	index: number;
	numItems: number;
	data: BarData;
	settings: HistogramSettings;
}

const Bar: React.FC<BarProps> = ({ index, data, settings }) => {
	const animatedHeight = useSharedValue<number>(0);
	const animatedColor = useSharedValue<string>(data.color);
	const animatedX = useSharedValue<number>(-1);
	const animatedBarWidth = useSharedValue<number>(-1);

	useEffect(() => {
		// Make sure that the graph is loaded before animating, so we
		// know that all values are available in their appropriate form.
		// For example, if the width dimensions of the graph are not available yet,
		// it will throw off the calculations, and the bars will animate from the wrong
		// beginning positions.
		if (settings.graphLoaded) {
			// Bar height
			const newHeight = interpolate(
				data.value,
				[settings.valueMin, settings.valueMax],
				[0, settings.graphHeight]
			);
			if (newHeight !== animatedHeight.value) {
				animatedHeight.value = withSpring(newHeight, { duration: 1700 });
			}

			// Bar color
			if (data.color !== animatedColor.value) {
				animatedColor.value = withTiming(data.color, { duration: 300 });
			}

			// Bar width
			if (settings.barWidth !== animatedBarWidth.value) {
				if (animatedBarWidth.value === -1) {
					animatedBarWidth.value = settings.barWidth;
				} else {
					animatedBarWidth.value = withTiming(settings.barWidth, {
						duration: 100
					});
				}
			}

			// Bar x position
			const newX = index * (settings.barWidth + settings.barMargin);
			if (animatedX.value !== newX) {
				if (animatedX.value === -1) {
					animatedX.value = newX;
				} else {
					animatedX.value = withTiming(newX, { duration: 300 });
				}
			}
		}
	}, [data.value, data.color, settings.barWidth, index]);

	return (
		<RoundedRect
			key={index}
			x={animatedX}
			y={0}
			width={animatedBarWidth}
			height={animatedHeight}
			color={animatedColor}
			r={settings.barRadius}
		/>
	);
};

export default Bar;
