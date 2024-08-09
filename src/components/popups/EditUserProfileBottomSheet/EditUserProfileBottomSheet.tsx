import { DismissKeyboardWrapper, View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { FullScreenSheetWithHeaderAndFooter } from '@organisms';
import { ThemePicker } from '@templates';
import React from 'react';
import EditHandle from './components/EditHandle';
import EditProfileImage from './components/EditProfileImage';
import ThemeModeSettings from './components/ThemeModeSettings';
import useEditUserProfileBottomSheet from './useEditUserProfileBottomSheet';

interface EditUserProfileBottomSheetProps {
	sheetApi: SheetApi;
}

const EditUserProfileBottomSheet: React.FC<EditUserProfileBottomSheetProps> = ({
	sheetApi
}) => {
	const { formMethods, handleTextInputApi, onSubmit } =
		useEditUserProfileBottomSheet(sheetApi);

	const footerContent = (
		<>
			<View flex={1} marginRight='s'>
				<Button text='cancel' onPress={sheetApi.close} variant='outlined' />
			</View>
			<View flex={1} marginLeft='s'>
				<Button text='Save' onPress={onSubmit} />
			</View>
		</>
	);

	return (
		<FullScreenSheetWithHeaderAndFooter
			FooterContent={footerContent}
			sheetApi={sheetApi}
		>
			<DismissKeyboardWrapper>
				<EditProfileImage />
				<EditHandle
					formMethods={formMethods}
					handleTextInputApi={handleTextInputApi}
				/>
				<ThemePicker />
				<ThemeModeSettings />
			</DismissKeyboardWrapper>
		</FullScreenSheetWithHeaderAndFooter>
	);
};

export default EditUserProfileBottomSheet;
