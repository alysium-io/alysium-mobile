import { View } from '@atomic';
import {
	ActionButtons,
	SelfAwareScrollView,
	useSelfAwareScrollView
} from '@molecules';
import { BasePage } from '@organisms';
import React, { useCallback } from 'react';
import EditArtistName from './components/EditArtistName';
import EditProfileImage from './components/EditProfileImage';
import EditArtistPageHeader from './EditArtist.header';
import useEditArtistPage from './useEditArtistPage';

const EditArtistPage = () => {
	const selfAwareScrollViewApi = useSelfAwareScrollView();
	const {
		editArtistFormApi,
		profileImage,
		setProfileImage,
		saveButtonStateApi
	} = useEditArtistPage();

	const FooterComponent = useCallback(
		() => (
			<View margin='m'>
				<ActionButtons
					buttonProps={{
						text: 'Save',
						color: 'p',
						onPress: editArtistFormApi.onSubmit,
						buttonState: saveButtonStateApi.buttonState
					}}
				/>
			</View>
		),
		[profileImage, saveButtonStateApi.buttonState]
	);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<EditArtistPageHeader />
			<SelfAwareScrollView selfAwareScrollViewApi={selfAwareScrollViewApi}>
				<View margin='m'>
					<EditProfileImage
						profileImage={profileImage}
						setProfileImage={setProfileImage}
					/>
					<EditArtistName editArtistFormApi={editArtistFormApi} />
				</View>
			</SelfAwareScrollView>
		</BasePage>
	);
};

export default EditArtistPage;
