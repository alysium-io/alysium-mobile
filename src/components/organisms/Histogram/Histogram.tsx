import { useLayoutDimensions } from '@hooks';
import { Canvas, Group } from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import Bar from './Bar';
import {
	BarData,
	HistogramSettings,
	defaultHistogramSettings
} from './settings';

interface HistogramProps {
	data: BarData[];
	settings?: Partial<HistogramSettings>;
}

const Histogram: React.FC<HistogramProps> = ({ data, settings }) => {
	const { dimensions, onLayout } = useLayoutDimensions();
	const _settings: HistogramSettings = useMemo(() => {
		const calculatedBarMargin =
			(settings?.barMargin || defaultHistogramSettings.barMargin) +
			(data.length - 1) / data.length;
		return {
			// Default settings
			...defaultHistogramSettings,

			// Virtual settings, calculated based on the data and dimensions
			// The user can override these settings if they want.
			barWidth:
				dimensions.width / data.length -
				calculatedBarMargin +
				calculatedBarMargin / data.length,
			graphWidth: dimensions.width,

			// User settings
			...settings,

			// Virtual settings, calculated regardless of user input

			// The margin in this case is not handled by the user because if, say the user
			// puts in a value of 1, and there are 3 items, then the actual margin will be
			// barMargin + (numItems - 1) / numItems = 1 + 2 / 3 = 1.6666666666666667
			// This accounts for the fact that the last item should not have a margin, and
			// the margin should be distributed evenly among the other items.
			barMargin: calculatedBarMargin,
			graphLoaded: dimensions.width > 0
		};
	}, [settings, dimensions, data]);

	return (
		<Canvas
			onLayout={onLayout}
			style={{
				width: '100%',
				height: _settings.graphHeight,
				transform: [{ rotate: '180deg' }]
			}}
		>
			<Group>
				{[...data].reverse().map((d, i) => (
					<Bar
						key={i}
						index={i}
						data={d}
						numItems={data.length}
						settings={_settings}
					/>
				))}
			</Group>
		</Canvas>
	);
};

export default Histogram;
