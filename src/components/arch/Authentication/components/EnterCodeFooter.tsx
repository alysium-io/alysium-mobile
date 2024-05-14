import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthenticationAppContext } from '../Authentication.context';

const EnterCodeFooter = () => {
	const { loginPhoneNumber } = useAuthenticationAppContext();
	const insets = useSafeAreaInsets();
	return (
		<View
			animated
			entering={FadeIn.duration(200)}
			exiting={FadeOut.duration(200)}
		>
			<View style={{ marginBottom: insets.bottom }} padding='m'>
				<Button
					text='Log In'
					onPress={loginPhoneNumber}
					colorVariant='negative'
				/>
			</View>
		</View>
	);
};

export default EnterCodeFooter;
