import { Text, TextInput, View } from '@atomic';
import { TextInputApi, useTextInput, useTheme } from '@hooks';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface TextBoxProps extends React.ComponentProps<typeof TextInput> {
	subtitle?: string | React.ReactNode;
	textInputApi?: TextInputApi;
}

const TextBox: React.FC<TextBoxProps> = ({
	subtitle,
	textInputApi,
	...props
}) => {
	const defaultTextInputApi = useTextInput(props.defaultValue);
	const _textInputApi = textInputApi || defaultTextInputApi;
	const { theme } = useTheme();

	return (
		<View>
			<TouchableWithoutFeedback
				onPress={() => _textInputApi.ref.current?.focus()}
			>
				<View
					animated
					backgroundColor='bg.light'
					padding='m'
					borderWidth={theme.borderWidth.normal}
					borderRadius='m'
					borderColor='border.medium'
				>
					<TextInput
						ref={_textInputApi.ref}
						variant='paragraph'
						placeholderTextColor={theme.colors['text.q']}
						color='text.p'
						multiline
						{...props}
					/>
				</View>
			</TouchableWithoutFeedback>
			{typeof subtitle === 'string' ? (
				<Text
					variant='paragraph-small'
					color='text.q'
					marginTop='s'
					marginHorizontal='s'
				>
					{subtitle}
				</Text>
			) : (
				subtitle
			)}
		</View>
	);
};

export default TextBox;
