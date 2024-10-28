import { View } from '@atomic';
import React from 'react';
import GalleryItemRow from './components/GalleryItemRow';
import { createGallerymap, GalleryProps } from './etc';
import EditableGalleryItem from './gallery-items/EditableGalleryItem';
import { GALLERY_ITEM_MARGIN } from './settings';

const EditableGallery: React.FC<GalleryProps> = ({
	gallery,
	findGalleryParamsDto
}) => {
	return (
		<View>
			{createGallerymap(gallery?.items)?.map((row, rowIndex) => (
				<GalleryItemRow
					key={rowIndex}
					style={{ marginBottom: GALLERY_ITEM_MARGIN }}
				>
					{row.map((item) => {
						return (
							<EditableGalleryItem
								key={item.orderIndex}
								galleryItem={item.galleryItem}
								index={item.orderIndex}
								findGalleryParamsDto={findGalleryParamsDto}
							/>
						);
					})}
				</GalleryItemRow>
			))}
		</View>
	);
};

export default EditableGallery;
