import { View } from '@atomic';
import { galleryApiSlice } from '@flux/api/gallery';
import { MediaRefType } from '@flux/api/media/types';
import { Gallery } from '@src/components/organisms/Gallery';
import { default as React } from 'react';

const GalleryDisplay = () => {
	const { data } = galleryApiSlice.useFindGalleryQuery({
		params: {
			refType: MediaRefType.artist,
			refId: 'BhBmP0sWGiO582CBQQmZoCN8'
		}
	});

	return (
		<View flex={1} justifyContent='center'>
			<Gallery gallery={data} />
		</View>
	);
};

export default GalleryDisplay;
