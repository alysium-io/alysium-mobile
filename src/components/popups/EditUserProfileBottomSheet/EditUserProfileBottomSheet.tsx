import { SheetApi } from '@hooks';
import React from 'react';
import UserEditUserProfileBottomSheet from './perspectives/user/UserEditUserProfileBottomSheet';

interface EditUserProfileBottomSheetProps {
	sheetApi: SheetApi;
}

const EditUserProfileBottomSheet: React.FC<EditUserProfileBottomSheetProps> = ({
	sheetApi
}) => {
	return <UserEditUserProfileBottomSheet sheetApi={sheetApi} />;
};

export default EditUserProfileBottomSheet;
