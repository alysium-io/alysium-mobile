import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { Text, View } from '@atomic';
import { useSheet } from '@hooks';
import { Button } from '@molecules';
import { ConfirmDeleteBottomSheet } from '@popups';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';

const LogoutSection = () => {
	const { deleteAccount, logout } = useAuthenticationAppContext();
	const { behavior } = useBehaviorContext();
	const confirmDeleteAccountSheetApi = useSheet();

	const onPressLogout = async () => behavior('PRESSED_LOGOUT').then(logout);

	const onPressDeleteAccount = () => {
		confirmDeleteAccountSheetApi.close();
		behavior('PRESSED_CONFIRM_DELETE_ACCOUNT');
		deleteAccount();
	};

	return (
		<View margin='m' marginTop='xl'>
			<View marginBottom='m'>
				<Button
					variant='outlined'
					color='t'
					text='Delete Account'
					onPress={confirmDeleteAccountSheetApi.open}
				/>
			</View>
			<Button color='t' text='Logout' onPress={onPressLogout} />
			<ConfirmDeleteBottomSheet
				sheetApi={confirmDeleteAccountSheetApi}
				onPressDeleteAccount={onPressDeleteAccount}
			>
				<Text variant='paragraph-medium' marginBottom='s'>
					Are you sure you want to delete your account?
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
