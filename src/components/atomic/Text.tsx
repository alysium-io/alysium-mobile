import { InanimateText, InanimateTextProps } from '@subatomic';
import React from 'react';
import { Text as RNText } from 'react-native';

const Text = React.forwardRef<
	React.ElementRef<typeof RNText>,
	InanimateTextProps
>(({ color = 'text.p', ...props }, ref) => {
	return <InanimateText ref={ref} color={color} {...props} />;
});

export default Text;
