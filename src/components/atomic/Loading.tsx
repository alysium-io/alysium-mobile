import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { ActivityIndicator } from 'react-native';

interface LoadingProps extends Props<typeof ActivityIndicator> {}

const Loading: React.FC<LoadingProps> = (props) => {
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<ActivityIndicator {...props} />
		</View>
	);
};

export default Loading;
