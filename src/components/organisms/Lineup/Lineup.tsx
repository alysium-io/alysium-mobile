import { View } from '@atomic';
import React from 'react';
import { ArtistListItem, EventListItem } from './ListItems';
import { LineupArtistProperties } from './settings';

interface LineupProps {
	lineup: LineupArtistProperties[];
}

const Lineup: React.FC<LineupProps> = ({ lineup }) => {
	return (
		<View>
			<EventListItem
				currentContainerType='event'
				nextContainerType='artist'
				text='start'
			/>
			{lineup.map((item, index) => (
				<ArtistListItem
					key={index}
					name={item.name}
					image={item.image}
					startTime={item.startTime}
					endTime={item.endTime}
					currentContainerType='artist'
					nextContainerType={index < lineup.length - 1 ? 'artist' : 'event'}
				/>
			))}
			<EventListItem
				currentContainerType='event'
				nextContainerType={null}
				text='end'
			/>
		</View>
	);
};

export default Lineup;
