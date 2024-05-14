import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { useArtistPageContext } from '../Artist.context';

const ActionButtons = () => {
	const { addArtistToEventCandidatesSheetApi } = useArtistPageContext();
	return (
		<View margin='m' flexDirection='row' flex={1}>
			<View marginRight='s' flex={1}>
				<Button
					text='Add to Event'
					onPress={addArtistToEventCandidatesSheetApi.open}
					variant='outlined'
				/>
			</View>
			<View marginLeft='s' flex={1}>
				<Button
					text='Start Contract'
					icon='arrow-right'
					variant='outlined'
					onPress={() => console.log('Start contract')}
				/>
			</View>
		</View>
	);
};

export default ActionButtons;
