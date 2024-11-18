import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type GalleryItemInnerContainerViewProps = Props<typeof View> & {};

const GalleryItemInnerContainerView: React.FC<
	GalleryItemInnerContainerViewProps
> = ({ ...props }) => {
	return <View position='absolute' height='100%' width='100%' {...props} />;
};

export default GalleryItemInnerContainerView;
