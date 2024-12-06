import { GalleryItem as IGalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useMultimedia } from '@hooks';
import { NanoId } from '@types';
import React from 'react';
import GalleryItemContainer from '../components/GalleryItemContainer';
import GalleryItemEditOverlay from '../overlays/GalleryItemEditOverlay';
import GalleryItemThumbnailOverlay from '../overlays/GalleryItemThumbnailOverlay';
import useCreateNewGalleryItem from './useCreateNewGalleryItem';

type EditableGalleryItemProps = {
	galleryItem?: IGalleryItem | null;
	galleryRefType: GalleryRefType;
	galleryRefUid: NanoId;
	order: number;
};

const EditableGalleryItem: React.FC<EditableGalleryItemProps> = ({
	galleryItem,
	galleryRefType,
	galleryRefUid,
	order
}) => {
	const { getImage } = useMultimedia();
	const { onPressReplaceOrDelete } = useCreateNewGalleryItem(
		galleryRefType,
		galleryRefUid,
		order
	);

	return (
		<GalleryItemContainer onPress={onPressReplaceOrDelete}>
			<GalleryItemThumbnailOverlay image={getImage(galleryItem?.multimedia)} />
			<GalleryItemEditOverlay />
		</GalleryItemContainer>
	);
};

export default EditableGalleryItem;
