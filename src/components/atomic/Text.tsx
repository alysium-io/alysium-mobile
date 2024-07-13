import {
	AnimatedText,
	AnimatedTextProps,
	InanimateText,
	InanimateTextProps
} from '@subatomic';
import React from 'react';
import { Text as RNText } from 'react-native';

type TextProps =
	| (InanimateTextProps & { animated: false })
	| (AnimatedTextProps & { animated?: true });

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(
	({ animated = false, ...props }, ref) => {
		if (animated) {
			const animatedBoxProps = props as AnimatedTextProps;
			return (
				<AnimatedText
					ref={ref as any}
					{...animatedBoxProps}
					color={props.color || 'text.p'}
				/>
			);
		} else {
			const boxProps = props as InanimateTextProps;
			return (
				<InanimateText
					ref={ref as any}
					{...boxProps}
					color={props.color || 'text.p'}
				/>
			);
		}
	}
);

export default Text;
