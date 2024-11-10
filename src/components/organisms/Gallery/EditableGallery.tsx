import { View } from '@atomic';
import { useGallery } from '@hooks';
import React from 'react';
import GalleryItemRow from './components/GalleryItemRow';
import { createGallerymap, GalleryProps } from './etc';
import EditableGalleryItem from './gallery-items/EditableGalleryItem';
import { GALLERY_ITEM_MARGIN } from './settings';

const EditableGallery: React.FC<GalleryProps> = ({
	findGalleryParamsDto,
	galleryRefType
}) => {
	const gallery = useGallery(galleryRefType);
	const { data } = gallery.find({ params: findGalleryParamsDto });

	return (
		<View>
			{createGallerymap(data?.items ?? [])?.map((row, rowIndex) => (
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
								galleryRefType={galleryRefType}
							/>
						);
					})}
				</GalleryItemRow>
			))}
		</View>
	);
};

export default EditableGallery;
