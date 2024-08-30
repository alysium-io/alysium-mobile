import { View } from '@atomic';
import { ChildrenProps, Props } from '@types';
import React from 'react';
import ActiveTrack from './ActiveTrack';
import { ActiveTrackState, SliderSettings } from './settings';
import StepMarkers from './StepMarker';
import Track from './Track';

type SliderContainerProps = ChildrenProps &
	Props<typeof View> & {
		sliderSettings: SliderSettings;
		activeTrackState: ActiveTrackState;
	};

const SliderContainer: React.FC<SliderContainerProps> = ({
	sliderSettings,
	activeTrackState,
	children,
	...props
}) => {
	return (
		<View width='100%' height={sliderSettings.thumbSize} {...props}>
			<Track sliderSettings={sliderSettings} />
			{sliderSettings.includeMarkers && (
				<StepMarkers
					sliderSettings={sliderSettings}
					activeTrackState={activeTrackState}
				/>
			)}
			<ActiveTrack
				activeTrackState={activeTrackState}
				sliderSettings={sliderSettings}
			/>
			{children}
		</View>
	);
};

export default SliderContainer;
