import { View } from '@atomic';
import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type DismissKeyboardWrapperProps = React.ComponentProps<typeof View> & {
	children?: React.ReactNode;
};

const DismissKeyboardWrapper: React.FC<DismissKeyboardWrapperProps> = ({
	children,
	...props
}) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View {...props} flex={1}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default DismissKeyboardWrapper;
