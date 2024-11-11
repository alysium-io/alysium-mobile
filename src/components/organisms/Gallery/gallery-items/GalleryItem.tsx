import { generateId } from '@etc';
import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { GalleryItem as IGalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useMultimedia, useNavigation } from '@hooks';
import React, { useMemo } from 'react';
import GalleryItemContainer from '../components/GalleryItemContainer';
import GalleryItemThumbnailOverlay from '../overlays/GalleryItemThumbnailOverlay';

type GalleryItemProps = {
	galleryItem?: IGalleryItem | null;
	index: number;
	findGalleryParamsDto: FindGalleryParamsDto;
	galleryRefType: GalleryRefType;
};

const GalleryItem: React.FC<GalleryItemProps> = ({
	galleryItem,
	index,
	findGalleryParamsDto,
	galleryRefType
}) => {
	const { viewGalleryPage } = useNavigation();
	const transitionTagId = useMemo(() => generateId(10), []);
	const { getImage } = useMultimedia();

	const onPress = () => {
		if (
			galleryItem !== null &&
			transitionTagId !== undefined &&
			index !== undefined
		) {
			viewGalleryPage(
				transitionTagId,
				index,
				findGalleryParamsDto,
				galleryRefType
			);
		}
	};

	return (
		<GalleryItemContainer onPress={onPress}>
			<GalleryItemThumbnailOverlay
				image={getImage(galleryItem?.multimedia)}
				sharedTransitionTag={transitionTagId}
			/>
		</GalleryItemContainer>
	);
};

export default GalleryItem;
