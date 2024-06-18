import { Text, TextInput, View } from '@atomic';
import { TextInputApi, useTheme } from '@hooks';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface EditableNumericInputWithLabelProps
	extends React.ComponentProps<typeof TextInput> {
	textInputApi: TextInputApi;
	label: string;
	labelColor?: React.ComponentProps<typeof Text>['color'];
}

const EditableNumericInputWithLabel: React.FC<
	EditableNumericInputWithLabelProps
> = ({
	textInputApi,
	label,
	keyboardType = 'numeric',
	labelColor = 't2',
	...props
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
					<Text
						variant='paragraph-small'
						color={labelColor}
						marginRight='m'
						ellipsizeMode='tail'
						numberOfLines={1}
					>
						{label}
					</Text>
				</View>
				<View>
					<TextInput
						ref={textInputApi.ref}
						variant='paragraph'
						color='t2'
						placeholderTextColor={theme.colors.t3}
						keyboardType={keyboardType}
						{...props}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default EditableNumericInputWithLabel;
