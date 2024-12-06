import { DynamicGrid } from '@atomic';
import { Gallery as IGallery } from '@flux/api/gallery/gallery.entity';
import { GalleryRefType } from '@flux/api/gallery/types';
import { NanoId } from '@types';
import React, { useMemo } from 'react';
import CreateNewGalleryItem from './gallery-items/CreateNewGalleryItem';
import EditableGalleryItem from './gallery-items/EditableGalleryItem';

interface EditableGalleryProps {
	gallery: IGallery | null;
	galleryRefType: GalleryRefType;
	galleryRefUid: NanoId;
}

const EditableGallery: React.FC<EditableGalleryProps> = ({
	gallery,
	galleryRefType,
	galleryRefUid
}) => {
	const data = useMemo(() => {
		// This "empty item" acts as the placeholder for the "Create New" button
		const emptyItem = { is_new: true, item: null };

		// If they have yet to create a gallery, we show only the "Create New" button
		if (!gallery?.items) return [emptyItem];

		// Gather the items in with the wrapper
		const items = gallery.items.map((i) => ({ is_new: false, item: i }));

		// If there's less than 6 items, we show the "Create New" button
		if (gallery.items.length < 6) {
			return [...items, emptyItem];
		}

		// Otherwise, we just show the items
		return items;
	}, [gallery]);

	return (
		<DynamicGrid
			data={data}
			renderItem={({ item, index }) => {
				if (!item.item || item.is_new) {
					return (
						<CreateNewGalleryItem
							galleryRefType={galleryRefType}
							galleryRefUid={galleryRefUid}
							order={Math.max(...data.map((i) => i.item?.order || 0)) + 1}
						/>
					);
				}
				return (
					<EditableGalleryItem
						key={index}
						galleryItem={item.item}
						galleryRefType={galleryRefType}
						galleryRefUid={galleryRefUid}
						order={item.item.order}
					/>
				);
			}}
		/>
	);
};

export default EditableGallery;
