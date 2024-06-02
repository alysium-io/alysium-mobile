import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useAuthenticationAppContext } from '../Authentication.context';

const EnterCodeFooter = () => {
	const { loginPhoneNumber, resetState } = useAuthenticationAppContext();
	return (
		<View
			animated
			entering={FadeIn.duration(200)}
			exiting={FadeOut.duration(200)}
		>
			<View padding='m' flexDirection='row'>
				<View flex={1} marginRight='s'>
					<Button text='Back' onPress={resetState} variant='outlined' />
				</View>
				<View flex={1} marginLeft='s'>
					<Button
						text='Log In'
						onPress={loginPhoneNumber}
						colorVariant='negative'
					/>
				</View>
			</View>
		</View>
	);
};

export default EnterCodeFooter;
