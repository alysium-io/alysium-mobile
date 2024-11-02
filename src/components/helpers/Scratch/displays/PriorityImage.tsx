import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const PriorityImage: React.FC = () => {
	const currentUrl =
		'https://dev-images.alysium.ninja/artist/BhBmP0sWGiO582CBQQmZoCN8/RPmalJnwwRK4xv2d8qsg0DG9/RPmalJnwwRK4xv2d8qsg0DG9.png';

	return <Animated.Image source={{ uri: currentUrl }} style={styles.image} />;
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover'
	}
});

export default PriorityImage;
