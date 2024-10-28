import { View } from '@atomic';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps extends React.ComponentProps<typeof ActivityIndicator> {}

const Loading: React.FC<LoadingProps> = (props) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator {...props} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Loading;
