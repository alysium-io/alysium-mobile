import { InanimateView, InanimateViewProps } from '@subatomic';
import React from 'react';
import { View as RNView } from 'react-native';

const View = React.forwardRef<
	React.ElementRef<typeof RNView>,
	InanimateViewProps
>(({ backgroundColor = 'transparent', ...props }, ref) => {
	return (
		<InanimateView ref={ref} backgroundColor={backgroundColor} {...props} />
	);
});

export default View;
