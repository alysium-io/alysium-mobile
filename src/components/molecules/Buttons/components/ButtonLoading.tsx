import { AView } from '@atomic';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const ButtonLoading = () => {
	return (
		<AView entering={FadeIn} exiting={FadeOut}>
			<ActivityIndicator size='small' color='#cccccc' />
		</AView>
	);
};

export default ButtonLoading;
