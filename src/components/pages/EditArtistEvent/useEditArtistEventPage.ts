import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { useToast } from '@hooks';
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
	const { toastSuccess } = useToast();
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

	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	const updateArtistEventFormApi = useUpdateArtistEventFormApi(event_uid, {
		initialValues: {
			name: eventData?.event.name,
			about: eventData?.event.about,
			start_time: eventData?.event.start_time,
			end_time: eventData?.event.end_time
		},
		methods: {
			onConfirmedValid: (data) => {
				console.log('Confirmed valid form data:', data);
			},
			onValidDidComplete: () => {
				toastSuccess('Event updated successfully');
			}
		}
	});

	const onBlurEditable = () => {
		updateArtistEventFormApi.onSubmit();
	};

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
