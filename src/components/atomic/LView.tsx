import { AView } from '@atomic';
import { ChildrenProps, Props } from '@types';
import React from 'react';
import { LinearTransition } from 'react-native-reanimated';

const LAYOUT_DURATION = 200;

type LViewProps = Props<typeof AView> & ChildrenProps;

const LView: React.FC<LViewProps> = (props) => {
	return (
		<AView
			layout={LinearTransition.duration(LAYOUT_DURATION)
				.springify()
				.damping(100)
				.stiffness(100)}
			{...props}
		/>
	);
};

export default LView;
