import { ChildrenProps, Props } from '@types';
import React from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const DismissKeyboardWrapper: React.FC<
	ChildrenProps & Props<typeof TouchableWithoutFeedback>
> = ({ children, ...props }) => {
	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			style={{ flex: 1 }}
			containerStyle={{ flex: 1 }}
			{...props}
		>
			{children}
		</TouchableWithoutFeedback>
	);
};

export default DismissKeyboardWrapper;
