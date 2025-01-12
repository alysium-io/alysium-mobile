import {
	AnimateTextInput,
	AnimateTextInputProps,
	InanimateTextInput,
	InanimateTextInputProps
} from '@subatomic';
import React from 'react';
import { Text as RNText } from 'react-native';

const TextInput = React.forwardRef<RNText, InanimateTextInputProps>(
	(
		{
			autoCorrect = false,
			autoComplete = 'off',
			autoCapitalize = 'sentences',
			...props
		},
		ref
	) => {
		return (
			<InanimateTextInput
				ref={ref}
				autoCorrect={autoCorrect}
				autoComplete={autoComplete}
				autoCapitalize={autoCapitalize}
				{...props}
			/>
		);
	}
);

const AnimatedTextInput = React.forwardRef<RNText, AnimateTextInputProps>(
	(
		{
			autoCorrect = false,
			autoComplete = 'off',
			autoCapitalize = 'sentences',
			...props
		},
		ref
	) => {
		return (
			<AnimateTextInput
				ref={ref}
				autoCorrect={autoCorrect}
				autoComplete={autoComplete}
				autoCapitalize={autoCapitalize}
				{...props}
			/>
		);
	}
);

export { AnimatedTextInput, TextInput };
