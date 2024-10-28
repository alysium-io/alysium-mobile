import { ComplexImage } from '@atomic';
import { Image } from '@flux/api/media';
import React from 'react';
import GalleryItemInnerContainerView from '../components/GalleryItemInnerContainerView';

type GalleryItemThumbnailOverlayProps = React.ComponentProps<
	typeof ComplexImage
> & {
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
