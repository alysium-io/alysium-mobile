import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import useUpdateArtistEventFormApi, {
	UpdateArtistEventFormApi
} from '@src/utils/redux-hook-form/useUpdateArtistEventFormApi';
import { ApiIdentifier } from '@types';
import { useState } from 'react';

interface IUseEditArtistEvent {
	eventData?: FindOneArtistEventResponseDto;
	isProfileImageLoading: boolean;
	setIsProfileImageLoading: (isLoading: boolean) => void;
	updateArtistEventProfileImage: () => void;
	updateArtistEventFormApi: UpdateArtistEventFormApi;
	onBlurEditable: () => void;
}

const useEditArtistEventPage = (
	event_uid: ApiIdentifier
): IUseEditArtistEvent => {
	const { artistData } = useArtistAppContext();
	const [isProfileImageLoading, setIsProfileImageLoading] =
		useState<boolean>(false);
	const updateArtistEventProfileImage = () => {
		setIsProfileImageLoading(true);
		setTimeout(() => {
			setIsProfileImageLoading(false);
		}, 2000);
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
