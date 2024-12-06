import { GalleryRefType } from '@flux/api/gallery/types';
import { NanoId } from '@types';
import React from 'react';
import GalleryItemContainer from '../components/GalleryItemContainer';
import GalleryItemEditOverlay from '../overlays/GalleryItemEditOverlay';
import useCreateNewGalleryItem from './useCreateNewGalleryItem';

interface CreateNewGalleryItemProps {
	galleryRefType: GalleryRefType;
	galleryRefUid: NanoId;
	order: number;
}

const CreateNewGalleryItem: React.FC<CreateNewGalleryItemProps> = ({
	galleryRefType,
	galleryRefUid,
	order
}) => {
	const { onPressCreateNewGalleryItem } = useCreateNewGalleryItem(
		galleryRefType,
		galleryRefUid,
		order
	);

	return (
		<GalleryItemContainer onPress={onPressCreateNewGalleryItem}>
			<GalleryItemEditOverlay />
		</GalleryItemContainer>
	);
};

export default CreateNewGalleryItem;
