import { ChildrenProps } from '@types';
import React from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const DismissKeyboardWrapper: React.FC<ChildrenProps> = ({ children }) => {
	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			style={{ flex: 1 }}
			containerStyle={{ flex: 1 }}
		>
			{children}
		</TouchableWithoutFeedback>
	);
};

export default DismissKeyboardWrapper;
