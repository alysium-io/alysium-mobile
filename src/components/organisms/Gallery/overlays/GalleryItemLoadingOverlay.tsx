import { SkeletonPlaceholder, View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import GalleryItemInnerContainerView from '../components/GalleryItemInnerContainerView';

const GalleryItemLoadingOverlay = () => {
	return (
		<GalleryItemInnerContainerView>
			<SkeletonPlaceholder>
				<View style={styles.container} />
			</SkeletonPlaceholder>
		</GalleryItemInnerContainerView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default GalleryItemLoadingOverlay;
