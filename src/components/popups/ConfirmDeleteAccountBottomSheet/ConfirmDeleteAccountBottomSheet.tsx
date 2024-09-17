import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { Text, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { BottomSheet } from '@organisms';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import React from 'react';

interface ConfirmDeleteAccountBottomSheetProps {
	sheetApi: SheetApi;
}

const ConfirmDeleteAccountBottomSheet: React.FC<
	ConfirmDeleteAccountBottomSheetProps
> = ({ sheetApi }) => {
	const { deleteAccount } = useAuthenticationAppContext();
	const { behavior } = useBehaviorContext();
	const onPressDeleteAccount = () => {
		sheetApi.close();
		behavior('PRESSED_CONFIRM_DELETE_ACCOUNT');
		deleteAccount();
	};

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<BottomSheetView style={{ flex: 1 }}>
				<View flex={1} margin='m' justifyContent='space-between'>
					<View margin='m' justifyContent='center' alignItems='center'>
						<Text variant='paragraph-medium' marginBottom='s'>
							Are you sure you want to delete your account?
						</Text>
						<Text
							variant='paragraph'
							color='text.s'
							textAlign='center'
							marginBottom='s'
						>
							You will lose all your data and you will not be able to recover
							it.
						</Text>
						<Text
							variant='paragraph'
							color='text.s'
							textAlign='center'
							marginBottom='s'
						>
							Alysium does not store any of your data after you delete your
							account. We also do not, at any point share any of your personal
							data with third parties.
						</Text>
					</View>
					<View marginBottom='m'>
						<Button
							onPress={sheetApi.close}
							variant='outlined'
							text='cancel'
							containerProps={{ marginBottom: 'm' }}
						/>
						<Button
							onPress={onPressDeleteAccount}
							color='t'
							text='confirm delete'
						/>
					</View>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ConfirmDeleteAccountBottomSheet;
