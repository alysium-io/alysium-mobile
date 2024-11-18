import { ComplexImage } from '@atomic';
import { Image } from '@flux/api/media';
import { Props } from '@types';
import React from 'react';
import GalleryItemInnerContainerView from '../components/GalleryItemInnerContainerView';

type GalleryItemThumbnailOverlayProps = Props<typeof ComplexImage> & {
	image?: Image | null;
};

const GalleryItemThumbnailOverlay: React.FC<
	GalleryItemThumbnailOverlayProps
> = ({ image, ...props }) => {
	return (
		<GalleryItemInnerContainerView>
			<ComplexImage image={image} {...props} />
		</GalleryItemInnerContainerView>
	);
};

export default GalleryItemThumbnailOverlay;
