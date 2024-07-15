import { Formatting } from '@etc';
import { useTheme } from '@hooks';
import {
	ColorProps,
	SpacingProps,
	VariantProps,
	color,
	createRestyleComponent,
	createVariant,
	spacing
} from '@shopify/restyle';
import { Theme } from '@types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

const textInputRestyleFunctions = [
	createVariant({ themeKey: 'textVariants' }),
	spacing,
	color
];

export type RestyleTextInputProps = SpacingProps<Theme> &
	VariantProps<Theme, 'textVariants'> &
	ColorProps<Theme> &
	TextInputProps;

const RestyleTextInputMask = createRestyleComponent<
	RestyleTextInputProps,
	Theme
>(textInputRestyleFunctions, TextInput);

export interface PhoneNumberTextInputProps
	extends Omit<RestyleTextInputProps, 'value'> {}

const PhoneNumberTextInput = forwardRef<TextInput, PhoneNumberTextInputProps>(
	(props, ref) => {
		const { theme } = useTheme();
		const internalRef = useRef<TextInput>(null);

		useImperativeHandle(ref, () => internalRef.current!, []);

		const handleTextInputChange = (text: string) => {
			const formattedText = Formatting.formatPhoneNumber(text);
			const currentRef =
				(ref as React.RefObject<TextInput>)?.current || internalRef.current;

			currentRef?.setNativeProps({
				text: formattedText
			});

			props.onChangeText && props.onChangeText(formattedText);
		};

		return (
			<RestyleTextInputMask
				ref={internalRef}
				textContentType='telephoneNumber'
				keyboardType='phone-pad'
				inputMode='tel'
				placeholder='(123) 456-7890'
				placeholderTextColor={theme.colors['text.q']}
				color='text.p'
				{...props}
				onChangeText={handleTextInputChange}
			/>
		);
	}
);

export default PhoneNumberTextInput;
