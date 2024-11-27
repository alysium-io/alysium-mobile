import { TextInput, View } from '@atomic';
import { TextInputApi, useTheme } from '@hooks';
import { Props } from '@types';
import React, { useRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import Container from './components/Container';
import Label from './components/Label';

type FormTextProps = Props<typeof TextInput> & {
	label: string;
	textInputApi?: TextInputApi;
};

const FormText: React.FC<FormTextProps> = ({
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
					color='text.p'
					placeholderTextColor={theme.colors['text.q']}
					scrollEnabled={false}
					multiline
					style={{
						padding: 0
					}}
					{...props}
				/>
			</View>
		</Container>
	);
};

export default FormText;
