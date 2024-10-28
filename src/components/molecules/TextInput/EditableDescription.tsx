import { TextInput, View } from '@atomic';
import { TextInputApi, useTextInput } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface EditableDescriptionProps
	extends React.ComponentProps<typeof TextInput> {
	textInputApi?: TextInputApi;
}

const EditableDescription: React.FC<EditableDescriptionProps> = ({
	textInputApi,
	...props
}) => {
	const defaultTextInputApi = useTextInput();
	const _textInputApi = textInputApi || defaultTextInputApi;
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				_textInputApi.focus();
			}}
		>
			<View
				style={styles.container}
				borderColor='border.light'
				paddingHorizontal='m'
				paddingVertical='s'
			>
				<TextInput
					ref={_textInputApi.ref}
					onChangeText={_textInputApi.setText}
					{...props}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderLeftWidth: 3,
		borderRightWidth: 3
	}
});

export default EditableDescription;
