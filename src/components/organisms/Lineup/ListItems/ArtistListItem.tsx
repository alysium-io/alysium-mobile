import { BgTouchAnimation } from '@atomic';
import { Time } from '@etc';
import React from 'react';
import { Connection } from '../Connections';
import { ArtistImage } from '../Images';
import LineupListItemRightColumn from '../LineupListItemRightColumn';
import LineupTextContainer from '../LineupTextContainer';
import ListItemContainer from '../ListItemContainer';
import { ContainerType, LineupArtistProperties } from '../settings';

type ArtistListItemProps = LineupArtistProperties & {
	currentContainerType: ContainerType;
	nextContainerType: ContainerType | null;
};

const ArtistListItem: React.FC<ArtistListItemProps> = ({
	name,
	image,
	startTime,
	endTime,
	currentContainerType,
	nextContainerType
}) => {
	const onPress = () => {
		console.log('Pressed: ' + name);
	};

	return (
		<BgTouchAnimation
			onPress={onPress}
			color='rgba(255, 255, 255, 0.1)'
			animationType='highlight'
		>
			<ListItemContainer containerType='artist'>
				<ArtistImage image={image} />
				<LineupTextContainer
					title={name}
					subtitle={Time.getDuration(startTime, endTime)}
				/>
				<Connection
					currentContainerType={currentContainerType}
					nextContainerType={nextContainerType}
				/>
				<LineupListItemRightColumn text={startTime.format('h:mma')} />
			</ListItemContainer>
		</BgTouchAnimation>
	);
};

export default ArtistListItem;
