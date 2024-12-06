import { Section, Text, View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { EditableDescription } from '@molecules';
import { EditableGallery } from '@organisms';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Separator from '../../EditArtist/components/Separator';

interface AssetsSectionProps {
	eventData: FindOneArtistEventResponseDto;
	control: Control<UpdateArtistEventBodyDto, any>;
	onBlurEditable: () => void;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({
	eventData,
	control,
	onBlurEditable
}) => {
	return (
		<Section>
			<View margin='m'>
				<Text variant='section-header-2'>Assets</Text>
				<Controller
					name='about'
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<EditableDescription
							placeholder='Tell us about this event...'
							onChangeText={onChange}
							onBlur={onBlurEditable}
							value={value ?? undefined}
						/>
					)}
				/>
				<EditableGallery
					gallery={eventData.event.gallery}
					galleryRefType={GalleryRefType.artistEvent}
					galleryRefUid={eventData.event.event_uid}
				/>
			</View>
			<Separator marginTop='xl' />
		</Section>
	);
};

export default AssetsSection;
