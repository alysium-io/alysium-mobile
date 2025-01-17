import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { useSheet } from '@hooks';
import { Button } from '@molecules';
import React from 'react';
import CreateArtistEventSheet from './sheets/CreateArtistEventSheet';

const EventManagerFooter = () => {
	const { isEditable } = useArtistAppContext();
	const createArtistEventSheetApi = useSheet();

	if (!isEditable) {
		return null;
	}

	return (
		<View margin='m'>
			<Button
				text='Create Event'
				color='p'
				onPress={createArtistEventSheetApi.open}
			/>
			<CreateArtistEventSheet sheetApi={createArtistEventSheetApi} />
		</View>
	);
};

export default EventManagerFooter;
