import { View } from '@atomic';
import { userApiSlice } from '@flux/api/user';
import React from 'react';
import { Button } from 'react-native';

const SentryTest = () => {
	const [registerUserPhoneNumber] =
		userApiSlice.useLazyRegisterUserPhoneNumberQuery();
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Button
				title='Try!'
				onPress={() => {
					registerUserPhoneNumber({
						body: {
							phone_number: '+1'
						}
					});
				}}
			/>
		</View>
	);
};

export default SentryTest;
