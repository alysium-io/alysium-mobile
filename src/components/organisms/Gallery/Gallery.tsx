import { View } from '@atomic';
import { useGallery } from '@hooks';
import React from 'react';
import GalleryItemRow from './components/GalleryItemRow';
import { createGallerymap, GalleryProps } from './etc';
import GalleryItem from './gallery-items/GalleryItem';
import { GALLERY_ITEM_MARGIN } from './settings';

const Gallery: React.FC<GalleryProps> = ({
	findGalleryParamsDto,
	galleryRefType
}) => {
	const gallery = useGallery(galleryRefType);
	const { data } = gallery.find({
		params: findGalleryParamsDto
	});

	return (
		<View>
			{createGallerymap(data?.items)?.map((row, rowIndex) => (
				<GalleryItemRow
					key={rowIndex}
					style={{ marginBottom: GALLERY_ITEM_MARGIN }}
				>
					{row.map((item) => {
						return (
							<GalleryItem
								key={item.orderIndex}
								galleryItem={item.galleryItem}
								index={item.orderIndex}
								findGalleryParamsDto={findGalleryParamsDto}
								galleryRefType={galleryRefType}
							/>
						);
					})}
				</GalleryItemRow>
			))}
		</View>
	);
};

export default Gallery;
