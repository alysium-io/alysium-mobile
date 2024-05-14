import { Text, View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { StyleSheet } from 'react-native';

const ErrorPage = () => {
	return (
		<BasePage>
			<View style={styles.container}>
				<Text>Error!</Text>
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

export default ErrorPage;
