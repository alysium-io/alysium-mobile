import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Formatting } from '@etc';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { useToast } from '@hooks';
import { ButtonStateApi, useButtonState } from '@molecules';
import useEditArtistFormApi, {
	EditArtistFormApi
} from '@src/utils/redux-hook-form/useEditArtistFormApi';
import { useState } from 'react';
import { Asset } from 'react-native-image-picker';

interface IUseEditArtistPage {
	editArtistFormApi: EditArtistFormApi;
	profileImage: Asset | null;
	setProfileImage: (profileImage: Asset | null) => void;
	saveButtonStateApi: ButtonStateApi;
}

const useEditArtistPage = (): IUseEditArtistPage => {
	const { toastSuccess, toastError } = useToast();
	const { artistData } = useArtistAppContext();
	const [profileImage, setProfileImage] = useState<Asset | null>(null);
	const saveButtonStateApi = useButtonState();
	const [createArtistProfileImageMutation] =
		profileImageApiSlice.useCreateArtistProfileImageMutation();

	const editArtistFormApi = useEditArtistFormApi({
		initialValues: {
			name: artistData.name,
			phone_number: Formatting.formatPhoneNumber(artistData.phone_number ?? ''),
			bio: artistData.bio
		},
		methods: {
			onConfirmedValid: () => {
				saveButtonStateApi.setButtonState('loading');
			},
			onValidDidComplete: async (res) => {
				const promises = [];
				if (profileImage) {
					promises.push(
						createArtistProfileImageMutation({
							file: profileImage,
							query: { artist_uid: artistData.artist_uid }
						})
					);
				}

				await Promise.all(promises);
				toastSuccess('Artist updated successfully');
				saveButtonStateApi.buttonSuccess();
			},
			onValidDidFail: (err) => {
				console.log(err);
				toastError('Failed to update artist');
				saveButtonStateApi.setButtonState('active');
			},
			onInvalid: (err) => {
				console.log(
					'Invalid with: ',
					editArtistFormApi.formMethods.getValues()
				);
				saveButtonStateApi.setButtonState('active');
			}
		}
	});

	const resetAll = () => {
		editArtistFormApi.formMethods.reset();
		saveButtonStateApi.setButtonState('disabled');
		setProfileImage(null);
	};

	return {
		editArtistFormApi,
		profileImage,
		setProfileImage,
		saveButtonStateApi
	};
};

export default useEditArtistPage;
