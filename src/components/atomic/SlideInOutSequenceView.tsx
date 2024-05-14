import { View } from '@atomic';
import { IChildrenProps } from '@types';
import React, { useMemo } from 'react';
import {
	FadeInLeft,
	FadeInRight,
	FadeOut,
	FadeOutLeft
} from 'react-native-reanimated';

const duration = 250;

type ViewProps = Omit<
	React.ComponentProps<typeof View>,
	'entering' | 'exiting' | 'animated'
>;
type SlideInOutSequenceViewProps = IChildrenProps &
	ViewProps & {
		sequenceState: number;
		prevSequenceState: React.MutableRefObject<number>;
		sequenceIndex: number;
	};

const SlideInOutSequenceView: React.FC<SlideInOutSequenceViewProps> = ({
	children,
	sequenceState,
	prevSequenceState,
	sequenceIndex,
	...props
}) => {
	const animations = useMemo(() => {
		if (sequenceState === prevSequenceState.current) {
			return {
				entering: FadeInLeft.duration(duration),
				exiting: FadeOutLeft.duration(duration)
			};
		} else if (sequenceState > prevSequenceState.current) {
			return {
				entering: FadeInRight.duration(duration),
				exiting: FadeOut.duration(duration)
			};
		} else {
			return {
				entering: FadeInLeft.duration(duration),
				exiting: FadeOut.duration(duration)
			};
		}
	}, [sequenceState]);

	return (
		<View
			animated
			entering={animations.entering}
			exiting={animations.exiting}
			{...props}
		>
			{children}
		</View>
	);
};

export default SlideInOutSequenceView;
