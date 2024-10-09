import { artistTagLinkApiSlice } from '@flux/api/artist-tag-link';
import { CreateArtistTagLinkBodyDto } from '@flux/api/artist-tag-link/dto/artist-tag-link-create.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import {
	ListApi,
	SequenceApi,
	SheetApi,
	TextInputApi,
	useList,
	useSequence,
	useTextInput
} from '@hooks';
import { ButtonStateApi, useButtonState } from '@molecules';
import useCreateArtistFormApi, {
	CreateArtistFormApi
} from '@src/utils/redux-hook-form/useCreateArtistFormApi';
import { useEffect, useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { TAG_LIMIT } from './constants';

interface IUseCreateArtistBottomSheet {
	artistNameTextInputApi: TextInputApi;
	createArtistFormApi: CreateArtistFormApi;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
	resetAll: () => void;
	cancel: () => void;
	createArtistSequenceApi: SequenceApi;
	artistNameNextButtonStateApi: ButtonStateApi;
	profileImage: Asset | null;
	setProfileImage: (profileImage: Asset | null) => void;
	selectedTagsListApi: ListApi<Omit<CreateArtistTagLinkBodyDto, 'artist_uid'>>;
}

const useCreateArtistBottomSheet = (
	sheetApi: SheetApi
): IUseCreateArtistBottomSheet => {
	const [createArtistProfileImageMutation] =
		profileImageApiSlice.useCreateArtistProfileImageMutation();
	const [createArtistTagLinkMutation] =
		artistTagLinkApiSlice.useCreateArtistTagLinkMutation();
	const artistNameTextInputApi = useTextInput();
	const createArtistSequenceApi = useSequence(3);
	const artistNameNextButtonStateApi = useButtonState('disabled');
	const [profileImage, setProfileImage] = useState<Asset | null>(null);

	const selectedTagsListApi = useList<
		Omit<CreateArtistTagLinkBodyDto, 'artist_uid'>
	>({
		limit: TAG_LIMIT,
		validator: (stateTag, tag) => stateTag.tag_uid === tag.tag_uid
	});

	const createArtistFormApi = useCreateArtistFormApi({
		methods: {
			onValidDidComplete: async (data) => {
				// If the artist creation completes successfully, we can update everything else
				// before we show the user the artist they've just created
				const promises = [];
				if (profileImage) {
					promises.push(
						createArtistProfileImageMutation({
							file: profileImage,
							query: {
								artist_uid: data.artist_uid
							}
						})
					);
				}

				if (!selectedTagsListApi.isEmpty) {
					// Create the artist tag links
					selectedTagsListApi.state.map((tag) => {
						promises.push(
							createArtistTagLinkMutation({
								body: {
									artist_uid: data.artist_uid,
									tag_uid: tag.tag_uid
								}
							})
						);
					});
				}

				await Promise.all(promises);
			}
		}
	});

	useEffect(() => {
		artistNameNextButtonStateApi.setButtonState(
			createArtistFormApi.formMethods.watch('name')?.length > 0
				? 'active'
				: 'disabled'
		);
	}, [createArtistFormApi.formMethods.watch('name')]);

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			artistNameTextInputApi.focus();
		}
	};

	const resetAll = () => {
		artistNameTextInputApi.reset();
		createArtistFormApi.formMethods.reset();
		createArtistSequenceApi.reset();
		artistNameNextButtonStateApi.setButtonState('disabled');
		selectedTagsListApi.reset();
		createArtistFormApi.reset();
		setProfileImage(null);
	};

	const cancel = () => {
		resetAll();
		sheetApi.close();
	};

	return {
		artistNameTextInputApi,
		createArtistFormApi,
		onSheetIndexChangeFocusTextInput,
		resetAll,
		cancel,
		createArtistSequenceApi,
		artistNameNextButtonStateApi,
		profileImage,
		setProfileImage,
		selectedTagsListApi
	};
};

export default useCreateArtistBottomSheet;
