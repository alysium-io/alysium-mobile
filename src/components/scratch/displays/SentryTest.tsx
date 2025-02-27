import { Text, View } from '@atomic';
import { userApiSlice } from '@flux/api/user';
import { captureException } from '@sentry/react-native';
import React from 'react';
import { Button } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

const SentryTest = () => {
	const [registerUserPhoneNumber] =
		userApiSlice.useLazyRegisterUserPhoneNumberQuery();
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Button
				title='Network Error'
				onPress={() => {
					registerUserPhoneNumber({
						body: {
							phone_number: '+1'
						}
					})
						.unwrap()
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							captureException(err);
						});
				}}
			/>
			<Button
				title='Local Error'
				onPress={() => {
					try {
						throw new Error('Test error 1');
					} catch (error) {
						captureException(error);
					}
				}}
			/>
			<Text>Env: {Config.ENV}</Text>
			<Text>Build Number: {Config.BUILD_NUMBER}</Text>
			<Text>Sentry DSN: {Config.SENTRY_DSN}</Text>
			<Text>Bundle ID: {DeviceInfo.getBundleId()}</Text>
		</View>
	);
};

export default SentryTest;
