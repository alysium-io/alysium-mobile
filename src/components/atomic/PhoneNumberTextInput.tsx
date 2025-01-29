import { Formatting } from '@etc';
import { useMergedRef, useTheme } from '@hooks';
import {
	color,
	ColorProps,
	createRestyleComponent,
	createVariant,
	spacing,
	SpacingProps,
	VariantProps
} from '@shopify/restyle';
import { Theme } from '@types';
import React, { forwardRef } from 'react';
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

export interface PhoneNumberTextInputProps extends RestyleTextInputProps {}

const PhoneNumberTextInput = forwardRef<TextInput, PhoneNumberTextInputProps>(
	(props, forwardedRef) => {
		const { theme } = useTheme();
		const ref = useMergedRef<TextInput>(forwardedRef);

		const handleTextInputChange = (text: string) => {
			const formattedText = Formatting.formatPhoneNumber(text);

			if (ref.current) {
				ref.current.setNativeProps({
					text: formattedText
				});
			}

			props.onChangeText?.(formattedText || '');
		};

		return (
			<RestyleTextInputMask
				ref={ref}
				textContentType='telephoneNumber'
				keyboardType='phone-pad'
				inputMode='tel'
				placeholder='(123) 456-7890'
				placeholderTextColor={theme.colors['text.q']}
				color='text.p'
				{...props}
				onChangeText={handleTextInputChange}
				maxLength={14}
			/>
		);
	}
);

export default PhoneNumberTextInput;
