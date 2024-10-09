import { DismissKeyboardWrapper, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import {
	FullScreenSheet,
	FullScreenSheetScrollView,
	FullScreenSheetStandardHeader
} from '@organisms';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import { ThemeModeSettings, ThemePicker } from '@templates';
import React, { useCallback } from 'react';
import EditHandle from '../../components/EditHandle';
import EditProfileImage from '../../components/EditProfileImage';
import useUserEditUserProfileBottomSheet from './useUserEditUserProfileBottomSheet';

interface UserEditUserProfileBottomSheetProps {
	sheetApi: SheetApi;
}

const UserEditUserProfileBottomSheet: React.FC<
	UserEditUserProfileBottomSheetProps
> = ({ sheetApi }) => {
	const { updateUserProfileFormApi } =
		useUserEditUserProfileBottomSheet(sheetApi);

	const footerComponent = useCallback((props: BottomSheetFooterProps) => {
		return (
			<FullScreenSheetFooter {...props}>
				<View flex={1} flexDirection='row'>
					<View flex={1} marginRight='s'>
						<Button text='cancel' onPress={sheetApi.close} variant='outlined' />
					</View>
					<View flex={1} marginLeft='s'>
						<Button text='Save' onPress={updateUserProfileFormApi.onSubmit} />
					</View>
				</View>
			</FullScreenSheetFooter>
		);
	}, []);

	return (
		<FullScreenSheet footerComponent={footerComponent} sheetApi={sheetApi}>
			<FullScreenSheetStandardHeader />
			<FullScreenSheetScrollView>
				<DismissKeyboardWrapper>
					<EditProfileImage />
					<EditHandle formMethods={updateUserProfileFormApi.formMethods} />
					<ThemePicker />
					<ThemeModeSettings />
				</DismissKeyboardWrapper>
			</FullScreenSheetScrollView>
		</FullScreenSheet>
	);
};

export default UserEditUserProfileBottomSheet;
