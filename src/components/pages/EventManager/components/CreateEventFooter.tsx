import { View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { CreateEventBottomSheet } from '@popups';
import React from 'react';

interface CreateEventFooterProps {
	createEventStartSheetApi: SheetApi;
}

const CreateEventFooter: React.FC<CreateEventFooterProps> = ({
	createEventStartSheetApi
}) => {
	return (
		<View margin='m' flex={1}>
			<Button
				text='Create Event'
				onPress={() => createEventStartSheetApi.open()}
			/>
			<CreateEventBottomSheet sheetApi={createEventStartSheetApi} />
		</View>
	);
};

export default CreateEventFooter;
