import { View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { ActionButtons } from '@molecules';
import {
	FullScreenSheet,
	FullScreenSheetFooter,
	FullScreenSheetScrollView,
	FullScreenSheetStandardHeader
} from '@organisms';
import { ThemeModeSettings, ThemePicker } from '@templates';
import React, { useCallback } from 'react';

interface UserEditUserProfileBottomSheetProps {
	sheetApi: SheetApi;
}

const UserEditUserProfileBottomSheet: React.FC<
	UserEditUserProfileBottomSheetProps
> = ({ sheetApi }) => {
	const footerComponent = useCallback((props: BottomSheetFooterProps) => {
		return (
			<FullScreenSheetFooter {...props}>
				<View flex={1}>
					<ActionButtons
						buttonProps={{
							text: 'Dismiss',
							onPress: sheetApi.close
						}}
					/>
				</View>
			</FullScreenSheetFooter>
		);
	}, []);

	return (
		<FullScreenSheet footerComponent={footerComponent} sheetApi={sheetApi}>
			<FullScreenSheetStandardHeader />
			<FullScreenSheetScrollView alwaysBounceVertical={false}>
				<ThemePicker />
				<ThemeModeSettings />
			</FullScreenSheetScrollView>
		</FullScreenSheet>
	);
};

export default UserEditUserProfileBottomSheet;
