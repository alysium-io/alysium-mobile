import { Text } from '@atomic';
import { SheetApi } from '@hooks';
import { BottomSheet } from '@organisms';
import React from 'react';

interface SelectedEventSheetProps {
	sheetApi: SheetApi;
}

const SelectedEventSheet: React.FC<SelectedEventSheetProps> = ({
	sheetApi
}) => {
	return (
		<BottomSheet ref={sheetApi.sheetRef} snapPoints={['50%']}>
			<Text>Hello World</Text>
		</BottomSheet>
	);
};

export default SelectedEventSheet;
