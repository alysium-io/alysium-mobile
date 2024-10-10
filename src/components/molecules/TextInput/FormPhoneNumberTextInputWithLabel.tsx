import { PhoneNumberTextInput, Text, View } from '@atomic';
import { TextInputApi, useTextInput, useTheme } from '@hooks';
import React from 'react';
import { If, Then } from 'react-if';
import { TextInputProps, TouchableWithoutFeedback } from 'react-native';

interface FormPhoneNumberTextInputWithLabelProps extends TextInputProps {
	textInputApi?: TextInputApi;
	label?: string;
}

const FormPhoneNumberTextInputWithLabel: React.FC<
	FormPhoneNumberTextInputWithLabelProps
> = ({ textInputApi, label, ...props }) => {
	const { theme } = useTheme();
	const defaultTextInputApi = useTextInput();
	const _textInputApi = textInputApi || defaultTextInputApi;

	return (
		<TouchableWithoutFeedback onPress={_textInputApi.focus}>
			<View
				flexDirection='row'
				paddingVertical='xl'
				borderBottomColor='border.medium'
				borderBottomWidth={theme.borderWidth.normal}
			>
				<If condition={label}>
					<Then>
						<Text variant='paragraph-medium' color='text.s' marginRight='m'>
							{label}
						</Text>
					</Then>
				</If>
				<View flex={1}>
					<PhoneNumberTextInput
						ref={_textInputApi.ref}
						variant='paragraph'
						color='text.s'
						placeholderTextColor={theme.colors['text.q']}
						{...props}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default FormPhoneNumberTextInputWithLabel;
