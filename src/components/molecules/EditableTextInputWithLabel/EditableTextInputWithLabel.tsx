import { Text, TextInput, View } from '@atomic';
import { TextInputApi, useTheme } from '@hooks';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

type EditableTextInputWithLabelProps = React.ComponentProps<
	typeof TextInput
> & {
	textInputApi: TextInputApi;
	textAlign?: 'left' | 'center';
	label: string;
};

const EditableTextInputWithLabel: React.FC<EditableTextInputWithLabelProps> = ({
	textInputApi,
	defaultValue,
	placeholder,
	onChangeText,
	onFocus,
	onBlur,
	value,
	label,
	keyboardType
}) => {
	const { theme } = useTheme();

	return (
		<TouchableWithoutFeedback onPress={textInputApi.focus}>
			<View
				paddingVertical='l'
				paddingHorizontal='s'
				borderBottomWidth={0.5}
				borderBottomColor='bg2'
			>
				<View style={{ marginBottom: 5 }}>
					<Text variant='paragraph-small' color='t1' marginRight='m'>
						{label}
					</Text>
				</View>
				<View>
					<TextInput
						ref={textInputApi.ref}
						defaultValue={defaultValue}
						placeholder={placeholder}
						onChangeText={onChangeText}
						onFocus={onFocus}
						onBlur={onBlur}
						value={value}
						variant='paragraph'
						color='t2'
						placeholderTextColor={theme.colors.t3}
						keyboardType={keyboardType}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default EditableTextInputWithLabel;
