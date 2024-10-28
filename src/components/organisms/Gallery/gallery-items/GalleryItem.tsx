import { generateId } from '@etc';
import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { GalleryItem as IGalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { useMultimedia, useNavigation } from '@hooks';
import React, { useMemo } from 'react';
import GalleryItemContainer from '../components/GalleryItemContainer';
import GalleryItemThumbnailOverlay from '../overlays/GalleryItemThumbnailOverlay';

type GalleryItemProps = {
	galleryItem?: IGalleryItem | null;
	index: number;
	findGalleryParamsDto: FindGalleryParamsDto;
};

const GalleryItem: React.FC<GalleryItemProps> = ({
	galleryItem,
	index,
	findGalleryParamsDto
}) => {
	const { viewGalleryPage } = useNavigation();
	const transitionTagId = useMemo(() => generateId(10), []);
	const { getImage } = useMultimedia();

	const onPress = () => {
		if (transitionTagId !== undefined && index !== undefined) {
			viewGalleryPage(transitionTagId, index, findGalleryParamsDto);
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
