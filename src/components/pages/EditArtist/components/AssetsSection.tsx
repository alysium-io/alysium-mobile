import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text, View } from '@atomic';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableDescription } from '@molecules';
import { EditableGallery } from '@organisms';
import React from 'react';
import Separator from './Separator';

const AssetsSection = () => {
	const { artistData } = useArtistAppContext();
	return (
		<Section>
			<View margin='m'>
				<Text variant='section-header-2'>Assets</Text>
				<EditableDescription value='Something really awesome here' />
				<EditableGallery
					galleryRefType={GalleryRefType.artist}
					findGalleryParamsDto={{
						refId: artistData.artist_uid
					}}
				/>
			</View>
			<Separator marginTop='xl' />
		</Section>
	);
};

export default AssetsSection;
