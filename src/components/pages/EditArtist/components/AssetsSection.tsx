import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text, View } from '@atomic';
import { UpdateArtistBodyDto } from '@flux/api/artist/dto/artist-update.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableDescription } from '@molecules';
import { EditableGallery } from '@organisms';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Separator from './Separator';

interface AssetsSectionProps {
	control: Control<UpdateArtistBodyDto, any>;
	onBlurEditable: () => void;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({
	control,
	onBlurEditable
}) => {
	const { artistData } = useArtistAppContext();
	return (
		<Section>
			<View margin='m'>
				<Text variant='section-header-2'>Assets</Text>
				<Controller
					name='bio'
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<EditableDescription
							placeholder='Tell your audience about yourself...'
							onChangeText={onChange}
							onBlur={onBlurEditable}
							value={value ?? undefined}
						/>
					)}
				/>
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
