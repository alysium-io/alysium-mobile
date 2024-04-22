import { View } from '@atomic';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const SearchResultsLoading = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator />
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

export default SearchResultsLoading;
