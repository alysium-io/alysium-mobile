import { View } from '@atomic';
import { EventMedia as IEventMedia } from '@flux/api/event-media/event-media.entity';
import { MediaType } from '@flux/api/media/types';
import { useNavigation } from '@hooks';
import { dayjs } from '@src/etc/dayjs';
import { orderBy } from 'lodash';
import React, { useMemo } from 'react';
import { Case, Switch } from 'react-if';
import Container from './components/Container';
import ImageItem from './components/ImageItem';
import VideoItem from './components/VideoItem';
import useSpacing from './useSpacing';

interface EventMediaProps {
	eventMedia: IEventMedia[];
}

const EventMedia: React.FC<EventMediaProps> = ({ eventMedia }) => {
	const { gap, squareWidth, onLayout } = useSpacing();
	const { viewEventMediaPage } = useNavigation();
	const renderedSquares: IEventMedia[] = useMemo(() => {
		return orderBy(
			eventMedia,
			[(s) => dayjs(s.created_at).valueOf()],
			['desc']
		);
	}, [eventMedia]);

	return (
		<View
			flexDirection='row'
			flexWrap='wrap'
			style={{ columnGap: gap, rowGap: gap }}
			onLayout={onLayout}
		>
			{renderedSquares.map((square, index) => (
				<Container key={index} squareWidth={squareWidth}>
					<Switch>
						<Case condition={square.multimedia.media_type === MediaType.image}>
							<ImageItem
								uri={square.multimedia.image?.large.key}
								onPress={() => {
									viewEventMediaPage(eventMedia, index);
								}}
							/>
						</Case>
						<Case condition={square.multimedia.media_type === MediaType.video}>
							<VideoItem
								uri={square.multimedia.video?.media.key}
								onPress={() => {
									viewEventMediaPage(eventMedia, index);
								}}
							/>
						</Case>
					</Switch>
				</Container>
			))}
		</View>
	);
};

export default EventMedia;
