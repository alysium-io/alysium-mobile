import { SheetApi } from '@hooks';
import { BottomSheet, BottomSheetListItem } from '@organisms';
import React from 'react';

interface MoreOptionsBottomSheetProps {
	sheetApi: SheetApi;
}

const MoreOptionsBottomSheet: React.FC<MoreOptionsBottomSheetProps> = ({
	sheetApi
}) => {
	return (
		<BottomSheet sheetRef={sheetApi.sheetRef}>
			<BottomSheetListItem
				text='send message'
				icon='dm'
				onPress={() => console.log('dm')}
			/>
			<BottomSheetListItem
				text='share'
				icon='share'
				onPress={() => console.log('share')}
			/>
			<BottomSheetListItem
				text='copy link'
				icon='link'
				onPress={() => console.log('copy link')}
				border={false}
			/>
		</BottomSheet>
	);
};

export default MoreOptionsBottomSheet;
