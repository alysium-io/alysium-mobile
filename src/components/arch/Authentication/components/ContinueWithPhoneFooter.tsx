import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthenticationAppContext } from '../Authentication.context';

const ContinueWithPhoneFooter = () => {
	const { continuePhoneNumber, state } = useAuthenticationAppContext();
	const insets = useSafeAreaInsets();
	return (
		<View
			animated
			entering={FadeIn.duration(200)}
			exiting={FadeOut.duration(200)}
		>
			<View style={{ marginBottom: insets.bottom }} padding='m'>
				<Button
					text='Continue Phone'
					onPress={continuePhoneNumber}
					colorVariant='positive'
					buttonState={state.isLoading ? 'loading' : 'default'}
				/>
			</View>
		</View>
	);
};

export default ContinueWithPhoneFooter;
