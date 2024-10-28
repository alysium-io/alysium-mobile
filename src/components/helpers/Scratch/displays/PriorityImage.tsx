import { usePriorityImage } from '@hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const PriorityImage: React.FC = () => {
	const urls = [
		'https://dev-images.alysium.ninja/artist/BhBmP0sWGiO582CBQQmZoCN8/RPmalJnwwRK4xv2d8qsg0DG9/RPmalJnwwRK4xv2d8qsg0DG9.png',
		'https://dev-images.alysium.ninja/artist/BhBmP0sWGiO582CBQQmZoCN8/2NVRbF3z07ZLzL8gS0rfjwkr/2NVRbF3z07ZLzL8gS0rfjwkr.png',
		'https://dev-images.alysium.ninja/artist/BhBmP0sWGiO582CBQQmZoCN8/ZqdFpx4uZQ0MKhqVQ0O6seMF/ZqdFpx4uZQ0MKhqVQ0O6seMF.png'
	];

	const { currentUrl } = usePriorityImage(urls);

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
