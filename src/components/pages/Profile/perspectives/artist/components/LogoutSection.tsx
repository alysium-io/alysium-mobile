import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { Text, View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { useSheet, useToast } from '@hooks';
import { Button } from '@molecules';
import { ConfirmDeleteBottomSheet } from '@popups';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import { Persona } from '@types';
import React from 'react';

const LogoutSection = () => {
	const { toastError } = useToast();
	const { logout } = useAuthenticationAppContext();
	const { userData } = useUserAppContext();
	const { changePersona } = usePersonaAppContext();
	const { behavior } = useBehaviorContext();
	const confirmDeleteAccountSheetApi = useSheet();
	const { artistData } = useArtistAppContext();
	const [deleteArtistMutation] = artistApiSlice.useDeleteArtistMutation();

	const onPressLogout = async () => behavior('PRESSED_LOGOUT').then(logout);

	const onPressDeleteAccount = async () => {
		confirmDeleteAccountSheetApi.close();
		behavior('PRESSED_CONFIRM_DELETE_ARTIST_PROFILE').catch((err) =>
			console.log(err)
		);

		try {
			await deleteArtistMutation({
				params: { artist_uid: artistData.artist_uid }
			});
			setTimeout(() => {
				changePersona(Persona.user, userData.user_uid);
			}, 200);
		} catch (error) {
			toastError('Something went wrong. Please try again.');
		}
	};

	return (
		<View margin='m' marginTop='xl'>
			<View marginBottom='m'>
				<Button
					variant='outlined'
					color='t'
					text='Delete Artist Profile'
					onPress={confirmDeleteAccountSheetApi.open}
				/>
			</View>
			<Button color='t' text='Logout' onPress={onPressLogout} />
			<ConfirmDeleteBottomSheet
				sheetApi={confirmDeleteAccountSheetApi}
				onPressDeleteAccount={onPressDeleteAccount}
			>
				<Text variant='section-header-1' marginHorizontal='m' marginBottom='m'>
					Delete {artistData.name}?
				</Text>
				<Text variant='paragraph-medium' marginBottom='s' textAlign='center'>
					Are you sure you want to delete this artist profile?
				</Text>
				<Text
					variant='paragraph'
					color='text.s'
					textAlign='center'
					marginBottom='s'
				>
					You will lose all your data and you will not be able to recover it.
				</Text>
				<Text
					variant='paragraph'
					color='text.s'
					textAlign='center'
					marginBottom='s'
				>
					Alysium does not store any of your data after you delete your account.
					We also do not, at any point share any of your personal data with
					third parties.
				</Text>
			</ConfirmDeleteBottomSheet>
		</View>
	);
};

export default LogoutSection;
