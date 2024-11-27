import { TextInput, View } from '@atomic';
import { TextInputApi } from '@hooks';
import { Props } from '@types';
import React, { useRef } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface EditableDescriptionProps extends Props<typeof TextInput> {
	textInputApi?: TextInputApi;
	containerProps?: Props<typeof View>;
}

const EditableDescription: React.FC<EditableDescriptionProps> = ({
	textInputApi,
	containerProps,
	...props
}) => {
	const ref = useRef<RNTextInput>(null);
	return (
		<TouchableWithoutFeedback onPress={() => ref.current?.focus()}>
			<View
				style={styles.container}
				borderColor='border.light'
				paddingHorizontal='m'
				paddingVertical='s'
				marginVertical='xl'
				{...containerProps}
			>
				<TextInput
					ref={ref}
					editable
					multiline
					scrollEnabled={false}
					variant='paragraph'
					placeholder='Add a description'
					style={{
						padding: 0
					}}
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
