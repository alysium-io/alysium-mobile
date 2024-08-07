import { View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const LoadingPage = () => {
	return (
		<BasePage>
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		</BasePage>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default LoadingPage;
