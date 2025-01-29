import { PhoneNumberTextInput, Text, View } from '@atomic';
import { useMergedRef, useTextInputFocusEffect, useTheme } from '@hooks';
import React, { forwardRef } from 'react';
import { If, Then } from 'react-if';
import {
	TextInput as RNTextInput,
	TextInputProps,
	TouchableWithoutFeedback
} from 'react-native';

interface FormPhoneNumberTextInputWithLabelProps extends TextInputProps {
	label?: string;
}

const FormPhoneNumberTextInputWithLabel = forwardRef<
	RNTextInput,
	FormPhoneNumberTextInputWithLabelProps
>(({ label, ...props }, forwardedRef) => {
	const { theme } = useTheme();
	const ref = useMergedRef<RNTextInput>(forwardedRef);
	useTextInputFocusEffect(ref);

	return (
		<TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
			<View
				flexDirection='row'
				paddingVertical='xl'
				borderBottomColor='border.light'
				borderBottomWidth={theme.borderWidth.normal}
			>
				<If condition={label}>
					<Then>
						<View width={75}>
							<Text variant='paragraph-medium' color='text.s' marginRight='m'>
								{label}
							</Text>
						</View>
					</Then>
				</If>
				<View flex={1}>
					<PhoneNumberTextInput
						ref={ref}
						variant='paragraph'
						color='text.t'
						placeholderTextColor={theme.colors['text.q']}
						{...props}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
});

export default FormPhoneNumberTextInputWithLabel;
