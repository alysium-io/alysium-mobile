import { PhoneNumberTextInput, TextInput, View } from '@atomic';
import { TextInputApi, useTheme } from '@hooks';
import { Props } from '@types';
import React, { useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import Container from './components/Container';
import Label from './components/Label';

type FormPhoneNumberProps = Props<typeof PhoneNumberTextInput> & {
	label: string;
	textInputApi?: TextInputApi;
};

const FormPhoneNumber: React.FC<FormPhoneNumberProps> = ({
	label,
	textInputApi,
	defaultValue,
	...props
}) => {
	const { theme } = useTheme();
	const ref = useRef<RNTextInput>(null);

	return (
		<Container onPress={() => ref.current?.focus()}>
			<Label>{label}</Label>
			<View flex={1}>
				<TextInput
					ref={ref}
					variant='paragraph'
					placeholderTextColor={theme.colors['text.q']}
					textContentType='telephoneNumber'
					keyboardType='phone-pad'
					inputMode='tel'
					placeholder='(123) 456-7890'
					color='text.p'
					{...props}
					maxLength={14}
				/>
			</View>
		</Container>
	);
};

export default FormPhoneNumber;
