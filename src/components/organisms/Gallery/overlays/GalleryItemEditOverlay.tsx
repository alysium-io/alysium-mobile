import { Icon, View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import GalleryItemInnerContainerView from '../components/GalleryItemInnerContainerView';

const GalleryItemEditOverlay = () => {
	return (
		<GalleryItemInnerContainerView>
			<View style={styles.background}>
				<Icon name='edit-image' size='l' color='palette.neutral.p1' />
			</View>
		</GalleryItemInnerContainerView>
	);
};

const styles = StyleSheet.create({
	background: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.15)'
	}
});

export default GalleryItemEditOverlay;
