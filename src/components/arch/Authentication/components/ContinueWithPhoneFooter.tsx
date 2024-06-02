import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useAuthenticationAppContext } from '../Authentication.context';

const ContinueWithPhoneFooter = () => {
	const { continuePhoneNumber, state } = useAuthenticationAppContext();
	return (
		<View
			animated
			entering={FadeIn.duration(200)}
			exiting={FadeOut.duration(200)}
		>
			<View padding='m'>
				<Button
					text='Send Text'
					onPress={continuePhoneNumber}
					colorVariant='positive'
					buttonState={state.isLoading ? 'loading' : 'default'}
				/>
			</View>
		</View>
	);
};

export default ContinueWithPhoneFooter;
