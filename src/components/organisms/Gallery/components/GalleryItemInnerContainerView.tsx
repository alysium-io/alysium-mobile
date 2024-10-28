import { View } from '@atomic';
import React from 'react';

type GalleryItemInnerContainerViewProps = React.ComponentProps<
	typeof View
> & {};

const GalleryItemInnerContainerView: React.FC<
	GalleryItemInnerContainerViewProps
> = ({ ...props }) => {
	return <View position='absolute' height='100%' width='100%' {...props} />;
};

export default GalleryItemInnerContainerView;
