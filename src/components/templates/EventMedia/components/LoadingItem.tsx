import { Image, View } from '@atomic';
import { useTheme } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import LoaderKit from 'react-native-loader-kit';

interface LoadingItemProps {
	uri?: string;
}

const LoadingItem: React.FC<LoadingItemProps> = ({ uri }) => {
	const { theme } = useTheme();
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			{uri && (
				<Image source={{ uri }} style={{ width: '100%', height: '100%' }} />
			)}
			<View
				style={StyleSheet.absoluteFill}
				justifyContent='center'
				alignItems='center'
			>
				<LoaderKit
					style={{ width: 40, height: 40 }}
					name='CircleStrokeSpin'
					color={theme.colors['etc.loader-kit']}
				/>
			</View>
		</View>
	);
};

export default LoadingItem;
