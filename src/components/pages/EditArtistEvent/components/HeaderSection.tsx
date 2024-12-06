import { Section, View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { usePriorityImage } from '@hooks';
import { EditableProfileImage, TitleTextInput } from '@molecules';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Asset } from 'react-native-image-picker';

interface HeaderSectionProps {
	eventData: FindOneArtistEventResponseDto;
	control: Control<UpdateArtistEventBodyDto>;
	onBlurEditable: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
	eventData,
	control,
	onBlurEditable
}) => {
	const [createArtistEventProfileImageMutation] =
		profileImageApiSlice.useCreateArtistEventProfileImageMutation();
	const [isProfileImageLoading, setIsProfileImageLoading] =
		useState<boolean>(false);
	const { currentUrl } = usePriorityImage(eventData?.event.profile_image);

	const updateArtistEventProfileImage = (profileImage: Asset) => {
		setIsProfileImageLoading(true);
		createArtistEventProfileImageMutation({
			file: profileImage,
			query: {
				event_uid: eventData.event.event_uid
			}
		}).finally(() => {
			// We give it an extra second to give it time to invalidate the cache
			// to avoid flickering
			setTimeout(() => {
				setIsProfileImageLoading(false);
			}, 1000);
		});
	};

	return (
		<Section>
			<View marginVertical='xxl' alignItems='center'>
				<EditableProfileImage
					size='large'
					onChooseImage={updateArtistEventProfileImage}
					image={currentUrl}
					isLoading={isProfileImageLoading}
					defaultImageProps={{
						icon: 'event'
					}}
				/>
			</View>
			<View marginHorizontal='m'>
				<Controller
					name='name'
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<TitleTextInput
							placeholder='Event name'
							onChangeText={onChange}
							value={value}
							onBlur={onBlurEditable}
						/>
					)}
				/>
			</View>
		</Section>
	);
};

export default HeaderSection;
