import { useRoute } from '@react-navigation/native';
import { ScrollReel } from '@src/components/organisms/ScrollReel';
import { ViewGalleryPageRouteProp } from '@types';

import React from 'react';

const ViewGalleryPage = () => {
	const route = useRoute<ViewGalleryPageRouteProp>();
	const { transitionTagId, galleryItems } = route.params;
	return <ScrollReel transitionTagId={transitionTagId} data={galleryItems} />;
};

export default ViewGalleryPage;
