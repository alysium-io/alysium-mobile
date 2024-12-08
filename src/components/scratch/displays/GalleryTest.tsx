import { Text, View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GalleryTest = () => {
	const insets = useSafeAreaInsets();
	const artist_uid = 'BhBmP0sWGiO582CBQQmZoCN8';
	const { data } = artistApiSlice.usePublicFindOneArtistQuery({
		params: {
			artist_uid
		}
	});
	if (!data) return null;
	console.log(data.gallery);
	return (
		<View style={{ marginTop: insets.top, flex: 1 }}>
			<ScrollView>
				<Text>GalleryTest</Text>
				{/* <Gallery
					gallery={data.gallery}
					galleryRefType={GalleryRefType.artist}
					galleryRefUid={artist_uid}
				/> */}
			</ScrollView>
		</View>
	);
};

export default GalleryTest;
