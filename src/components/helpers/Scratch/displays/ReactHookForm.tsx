import { Text, View } from '@atomic';
import { artistTagLinkApiSlice } from '@flux/api/artist-tag-link';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { useList, useSequence, useTextInput } from '@hooks';
import { ActionButtons, useButtonState } from '@molecules';
import useCreateArtistFormApi from '@src/utils/redux-hook-form/useCreateArtistFormApi';
import React, { useState } from 'react';
import { Asset } from 'react-native-image-picker';

type CustomState = {
	name: string;
};

type ListState = {
	foo: string;
};

const TAG_LIMIT = 6;

const ReactHookForm = () => {
	/**
	 * I made this proof of concept to demonstrate that my method for using the `useCreateArtistFormApi` hook works
	 * as intended, as does indeed update callback functions appropriately. I'm just leaving this note here for myself
	 * just in case I run into this issue again...
	 *
	 * The problem was that my `createArtistFormApi.onSubmit` method was being called inside of the definition
	 * for my FullScreenSheetFooter, which was rendered using the `useCallback` hook. This caused the `onSubmit` handler
	 * to not update appropriately, so i just added it to the dependency array of the `useCallback` hook and it worked.
	 *
	 * The file where the original problem existed is located at:
	 * src/components/popups/CreateArtistBottomSheet/CreateArtistBottomSheet.tsx
	 */
	const [createArtistProfileImageMutation] =
		profileImageApiSlice.useCreateArtistProfileImageMutation();
	const [createArtistTagLinkMutation] =
		artistTagLinkApiSlice.useCreateArtistTagLinkMutation();
	const artistNameTextInputApi = useTextInput();
	const createArtistSequenceApi = useSequence(3);
	const artistNameNextButtonStateApi = useButtonState('disabled');
	const [profileImage, setProfileImage] = useState<Asset | null>(null);

	const listApi = useList<ListState>({
		limit: TAG_LIMIT,
		validator: (stateTag, tag) => stateTag.foo === tag.foo
	});

	const logState = () => {
		console.log('State');
		console.log(listApi.state);
	};

	const add = () => listApi.add({ foo: 'bar' });
	const subtract = () => listApi.remove({ foo: 'bar' });

	const createArtistFormApi = useCreateArtistFormApi({
		methods: {
			onConfirmedValid: () => {
				console.log('onConfirmedValid');
				console.log(listApi.state);
			},
			onValidDidComplete: async (data) => {
				console.log('onValidDidComplete');
				console.log(listApi.state);
			},
			onValidDidFail: () => {
				console.log('onValidDidFail');
				console.log(listApi.state);
			}
		}
	});

	return (
		<View flex={1}>
			<View flex={1}>
				<Text>Hi</Text>
			</View>
			<View marginBottom='xxxxl'>
				<View margin='m'>
					<ActionButtons
						buttonProps={[
							{ text: 'state', variant: 'outlined', onPress: logState },
							{
								text: 'onValid',
								variant: 'outlined',
								onPress: createArtistFormApi.onSubmit
							}
						]}
					/>
				</View>
				<View margin='m'>
					<ActionButtons
						buttonProps={[
							{ text: 'subtract', onPress: subtract },
							{ text: 'add', onPress: add }
						]}
					/>
				</View>
			</View>
		</View>
	);
};

export default ReactHookForm;
