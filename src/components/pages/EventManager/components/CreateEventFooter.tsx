import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { useEventManagerPageContext } from '../EventManager.context';
import CreateEventStartBottomSheet from './CreateEventStartBottomSheet';

const CreateEventFooter = () => {
	const { createEventStartSheetApi } = useEventManagerPageContext();

	return (
		<View margin='m' flex={1}>
			<Button
				text='Create Event'
				onPress={() => createEventStartSheetApi.open()}
			/>
			<CreateEventStartBottomSheet sheetApi={createEventStartSheetApi} />
		</View>
	);
};

export default CreateEventFooter;
