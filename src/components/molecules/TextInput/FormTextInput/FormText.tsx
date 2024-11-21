import { TextInput, View } from '@atomic';
import { TextInputApi, useTextInput, useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import Container from './components/Container';
import Label from './components/Label';

type FormTextProps = Props<typeof TextInput> & {
	label: string;
	textInputApi?: TextInputApi;
};

const FormText: React.FC<FormTextProps> = ({
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
				<TextInput
					ref={_textInputApi.ref}
					variant='paragraph'
					color='text.t'
					placeholderTextColor={theme.colors['text.q']}
					scrollEnabled={false}
					multiline
					style={{
						padding: 0 // because `multiline` prop adds padding
					}}
					{...props}
				/>
			</View>
		</Container>
	);
};

export default FormText;
