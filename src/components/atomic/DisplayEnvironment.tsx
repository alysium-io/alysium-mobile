import { Text, View } from '@atomic';
import React from 'react';
import Config from 'react-native-config';

const DisplayEnvironment = () => {
	return (
		<View>
			{Object.entries(Config).map(([key, value]) => (
				<Text key={key} marginBottom='s'>
					{key}: {value?.toString()}
				</Text>
			))}
		</View>
	);
};

export default DisplayEnvironment;
