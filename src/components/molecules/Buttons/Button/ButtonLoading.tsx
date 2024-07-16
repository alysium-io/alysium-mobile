import { View } from '@atomic';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const ButtonLoading = () => {
	return (
		<View animated entering={FadeIn} exiting={FadeOut}>
			<ActivityIndicator size='s' color='#cccccc' />
		</View>
	);
};

export default ButtonLoading;
