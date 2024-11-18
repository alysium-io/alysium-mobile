import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import Animated, {
	EntryAnimationsValues,
	ExitAnimationsValues,
	SharedValue,
	SlideInLeft,
	SlideInRight,
	SlideOutLeft,
	SlideOutRight
} from 'react-native-reanimated';

const duration = 200;

const slideOutLeftAnimation = new SlideOutLeft().duration(duration).build();
const slideOutRightAnimation = new SlideOutRight().duration(duration).build();

const slideInLeftAnimation = new SlideInLeft().duration(duration).build();
const slideInRightAnimation = new SlideInRight().duration(duration).build();

const instantEnterAnimation = new SlideInRight().duration(-1).build();

type SequenceItemProps = Props<typeof View> & {
	sequenceIndex: number;
	index: number;
	exitDirection: SharedValue<'left' | 'right' | null>;
	children: React.ReactNode;
};
const SequenceItem: React.FC<SequenceItemProps> = ({
	sequenceIndex,
	index,
	exitDirection,
	children,
	...props
}) => {
	const CustomExitingAnimation = (values: ExitAnimationsValues) => {
		'worklet';
		return exitDirection.value === 'left'
			? slideOutLeftAnimation(values)
			: slideOutRightAnimation(values);
	};

	const CustomEnteringAnimation = (values: EntryAnimationsValues) => {
		'worklet';

		if (exitDirection.value === null) {
			return instantEnterAnimation(values);
		}

		return exitDirection.value === 'left'
			? slideInRightAnimation(values)
			: slideInLeftAnimation(values);
	};

	return (
		sequenceIndex === index && (
			<Animated.View
				exiting={CustomExitingAnimation}
				entering={CustomEnteringAnimation}
				{...props}
			>
				{children}
			</Animated.View>
		)
	);
};

export default SequenceItem;
