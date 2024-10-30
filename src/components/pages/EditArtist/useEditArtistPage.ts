import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Formatting } from '@etc';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { useToast } from '@hooks';
import useEditArtistFormApi, {
	EditArtistFormApi
} from '@src/utils/redux-hook-form/useEditArtistFormApi';
import { useState } from 'react';
import { Asset } from 'react-native-image-picker';

interface IUseEditArtistPage {
	editArtistFormApi: EditArtistFormApi;
	onBlurEditable: () => void;
	updateArtistProfileImage: (profileImage: Asset) => void;
	isProfileImageLoading: boolean;
}

const useEditArtistPage = (): IUseEditArtistPage => {
	const { toastSuccess, toastError } = useToast();
	const { artistData } = useArtistAppContext();
	const [createArtistProfileImageMutation] =
		profileImageApiSlice.useCreateArtistProfileImageMutation();
	const [isProfileImageLoading, setIsProfileImageLoading] = useState(false);

	const updateArtistProfileImage = async (profileImage: Asset) => {
		setIsProfileImageLoading(true);
		try {
			await createArtistProfileImageMutation({
				file: profileImage,
				query: { artist_uid: artistData.artist_uid }
			});
		} finally {
			// Give it another second to invalidate the artist data
			// which is where we're actually getting this image from
			setTimeout(() => {
				setIsProfileImageLoading(false);
			}, 1000);
		}
	};

	const editArtistFormApi = useEditArtistFormApi({
		initialValues: {
			name: artistData.name,
			phone_number: Formatting.formatPhoneNumber(artistData.phone_number ?? ''),
			bio: artistData.bio
		},
		methods: {
			onValidDidComplete: async (res) => {
				toastSuccess('Artist updated successfully');
			},
			onValidDidFail: (err) => {
				console.log(err);
				toastError('Failed to update artist');
			},
			onInvalid: (err) => {
				console.log(
					'Invalid with: ',
					editArtistFormApi.formMethods.getValues()
				);
			}
		}
	});

	// You do need to destructure like this in order to properly subscribe to this property
	const { isDirty: isEditArtistFormApiDirty } =
		editArtistFormApi.formMethods.formState;

	const onBlurEditable = () => {
		if (isEditArtistFormApiDirty) {
			editArtistFormApi.onSubmit();
		}
	};

	return {
		editArtistFormApi,
		updateArtistProfileImage,
		onBlurEditable,
		isProfileImageLoading
	};
};

export default useEditArtistPage;
