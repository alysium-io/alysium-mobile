import { PhoneNumberTextInput, View } from '@atomic';
import { TextInputApi, useTextInput, useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';
import Label from './components/Label';

type FormPhoneNumberProps = Props<typeof PhoneNumberTextInput> & {
	label: string;
	textInputApi?: TextInputApi;
};

const FormPhoneNumber: React.FC<FormPhoneNumberProps> = ({
	label,
	textInputApi,
	...props
}) => {
	const { theme } = useTheme();
	const defaultTextInputApi = useTextInput(props.defaultValue);
	const _textInputApi = textInputApi || defaultTextInputApi;

	return (
		<Container onPress={_textInputApi.focus}>
			<Label>{label}</Label>
			<View flex={1}>
				<PhoneNumberTextInput
					ref={_textInputApi.ref}
					variant='paragraph'
					color='text.t'
					placeholderTextColor={theme.colors['text.q']}
					{...props}
				/>
			</View>
		</Container>
	);
};

export default FormPhoneNumber;
