import React, { useMemo } from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import LView from './LView';

interface AppTransitionWrapperProps {
	children: React.ReactNode;
}

const AppTransitionWrapper: React.FC<AppTransitionWrapperProps> = (props) => {
	const entering = useMemo(() => FadeIn.duration(300).delay(300), []);
	const exiting = useMemo(() => FadeOut.duration(300), []);
	return (
		<LView
			entering={entering}
			exiting={exiting}
			style={{ flex: 1 }}
			{...props}
		/>
	);
};

export default AppTransitionWrapper;
