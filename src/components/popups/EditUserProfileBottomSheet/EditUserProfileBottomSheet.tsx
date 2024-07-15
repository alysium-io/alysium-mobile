import { DismissKeyboardWrapper, View } from '@atomic';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
	BottomSheetView
} from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { BottomSheet } from '@organisms';
import { ThemePicker } from '@templates';
import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
	const insets = useSafeAreaInsets();
	const { formMethods, handleTextInputApi, onSubmit } =
		useEditUserProfileBottomSheet(sheetApi);

	const renderFooter = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<View
					margin='m'
					marginBottom='none'
					flexDirection='row'
					style={{ paddingBottom: insets.bottom }}
				>
					<View flex={1} marginRight='s'>
						<Button text='cancel' onPress={sheetApi.close} variant='outlined' />
					</View>
					<View flex={1} marginLeft='s'>
						<Button text='Save' onPress={onSubmit} />
					</View>
				</View>
			</BottomSheetFooter>
		),
		[]
	);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['100%']}
			handleComponent={null}
			footerComponent={renderFooter}
		>
			<DismissKeyboardWrapper>
				<BottomSheetView style={[{ flex: 1, marginTop: insets.top }]}>
					<EditProfileImage />
					<EditHandle
						formMethods={formMethods}
						handleTextInputApi={handleTextInputApi}
					/>
					<ThemePicker />
					<ThemeModeSettings />
				</BottomSheetView>
			</DismissKeyboardWrapper>
		</BottomSheet>
	);
};

export default EditUserProfileBottomSheet;
