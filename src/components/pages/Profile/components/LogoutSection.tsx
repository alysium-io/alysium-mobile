import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { View } from '@atomic';
import { useSheet } from '@hooks';
import { Button } from '@molecules';
import { ConfirmDeleteAccountBottomSheet } from '@popups';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';

const LogoutSection = () => {
	const { logout } = useAuthenticationAppContext();
	const { behavior } = useBehaviorContext();
	const confirmDeleteAccountSheetApi = useSheet();

	const onPressLogout = async () => behavior('PRESSED_LOGOUT').then(logout);

	return (
		<View margin='m' marginTop='xl'>
			<View marginBottom='m'>
				<Button color='t' text='Logout' onPress={onPressLogout} />
			</View>
			<Button
				variant='outlined'
				color='t'
				text='Delete Account'
				onPress={confirmDeleteAccountSheetApi.open}
			/>
			<ConfirmDeleteAccountBottomSheet
				sheetApi={confirmDeleteAccountSheetApi}
			/>
		</View>
	);
};

export default LogoutSection;
