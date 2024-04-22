import { InanimateTextInput, InanimateTextInputProps } from '@subatomic';
import React from 'react';
import { Text as RNText } from 'react-native';

type TextProps = InanimateTextInputProps;

const TextInput = React.forwardRef<RNText, TextProps>(
	(
		{
			autoCorrect = false,
			autoComplete = 'off',
			autoCapitalize = 'none',
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

export default TextInput;
