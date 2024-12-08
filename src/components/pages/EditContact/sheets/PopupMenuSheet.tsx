import { Text } from '@atomic';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheet } from '@organisms';
import React from 'react';

interface PopupMenuSheetProps {
	sheetApi: SheetApi;
}

const PopupMenuSheet: React.FC<PopupMenuSheetProps> = ({ sheetApi }) => {
	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<BottomSheetScrollView>
				<Text
					variant='paragraph'
					color='text.q'
					textAlign='center'
					marginVertical='m'
				>
					Hello World
				</Text>
			</BottomSheetScrollView>
		</BottomSheet>
	);
};

export default PopupMenuSheet;
