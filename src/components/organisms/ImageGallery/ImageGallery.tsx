import { View } from '@atomic';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';

const SPACING = 1;
const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_SIZE = (width - SPACING * 3) / COLUMN_COUNT; // Accounting for 2 items and 3 gaps

interface ImageGalleryProps {
	images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
	const remainder = images.length % COLUMN_COUNT;

	return (
		<View style={styles.gridContainer}>
			{images.map((item, index) => {
				let itemStyle: any = styles.imageWrapper;
				if (remainder !== 0 && index >= images.length - remainder) {
					itemStyle = { ...styles.imageWrapper, flex: 1 };
				}

				return (
					<View style={itemStyle} key={Math.random().toString()}>
						<Image style={styles.image} source={{ uri: item }} />
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	gridContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	imageWrapper: {
		width: ITEM_SIZE,
		height: ITEM_SIZE,
		margin: SPACING / 2
	},
	image: {
		flex: 1
	}
});

export default ImageGallery;
