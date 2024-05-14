import { View } from '@atomic';
import { global } from '@etc';
import { Lineup } from '@organisms';
import React from 'react';

const ArtistLineup = () => {
	return (
		<View>
			<Lineup lineup={global.sampleData.event.lineup} />
		</View>
	);
};

export default ArtistLineup;
