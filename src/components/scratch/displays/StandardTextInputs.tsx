import { Text, View } from '@atomic';
import { FormPhoneNumber, FormText } from '@molecules';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StandardTextInputs = () => {
	const insets = useSafeAreaInsets();
	return (
		<View margin='m' style={{ marginTop: insets.top }}>
			<Text>Hello World</Text>
			<FormPhoneNumber label='Phone' />
			<FormText label='Bio' placeholder='Tell us about yourself!' />
		</View>
	);
};

export default StandardTextInputs;
