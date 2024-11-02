import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import useUpdateArtistEventFormApi, {
	UpdateArtistEventFormApi
} from '@src/utils/redux-hook-form/useUpdateArtistEventFormApi';
import { ApiIdentifier } from '@types';
import { useState } from 'react';
import { Asset } from 'react-native-image-picker';

interface IUseEditArtistEvent {
	eventData?: FindOneArtistEventResponseDto;
	isProfileImageLoading: boolean;
	setIsProfileImageLoading: (isLoading: boolean) => void;
	updateArtistEventProfileImage: (profileImage: Asset) => void;
	updateArtistEventFormApi: UpdateArtistEventFormApi;
	onBlurEditable: () => void;
}

const useEditArtistEventPage = (
	event_uid: ApiIdentifier
): IUseEditArtistEvent => {
	const { artistData } = useArtistAppContext();
	const [createArtistEventProfileImageMutation] =
		profileImageApiSlice.useCreateArtistEventProfileImageMutation();
	const [isProfileImageLoading, setIsProfileImageLoading] =
		useState<boolean>(false);
	const updateArtistEventProfileImage = (profileImage: Asset) => {
		setIsProfileImageLoading(true);
		createArtistEventProfileImageMutation({
			file: profileImage,
			query: {
				event_uid
			}
		}).finally(() => {
			// We give it an extra second to give it time to invalidate the cache
			// to avoid flickering
			setTimeout(() => {
				setIsProfileImageLoading(false);
			}, 1000);
		});
	};

	const updateArtistEventFormApi = useUpdateArtistEventFormApi(event_uid);

	const onBlurEditable = () => {
		console.log('onBlurEditable');
	};

	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	return {
		eventData,
		isProfileImageLoading,
		setIsProfileImageLoading,
		updateArtistEventProfileImage,
		updateArtistEventFormApi,
		onBlurEditable
	};
};

export default useEditArtistEventPage;
