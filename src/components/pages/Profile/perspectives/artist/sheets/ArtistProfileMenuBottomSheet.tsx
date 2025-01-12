import { ScrollView } from '@atomic';
import { SheetApi } from '@hooks';
import { FullScreenSheet } from '@organisms';
import { ThemeModeSettings, ThemePicker } from '@templates';
import React from 'react';

interface UserEditUserProfileBottomSheetProps {
	sheetApi: SheetApi;
}

const UserEditUserProfileBottomSheet: React.FC<
	UserEditUserProfileBottomSheetProps
> = ({ sheetApi }) => {
	return (
		<FullScreenSheet sheetApi={sheetApi}>
			<ScrollView alwaysBounceVertical={false}>
				<ThemePicker />
				<ThemeModeSettings />
			</ScrollView>
		</FullScreenSheet>
	);
};

export default UserEditUserProfileBottomSheet;
