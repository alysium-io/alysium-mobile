import { View } from '@atomic';
import { EventMedia as IEventMedia } from '@flux/api/event-media/event-media.entity';
import { useImage, useNavigation } from '@hooks';
import { dayjs } from '@src/etc/dayjs';
import { orderBy } from 'lodash';
import React, { useMemo } from 'react';
import Container from './components/Container';
import ImageItem from './components/ImageItem';
import useSpacing from './useSpacing';

interface EventMediaProps {
	eventMedia: IEventMedia[];
}

const EventMedia: React.FC<EventMediaProps> = ({ eventMedia }) => {
	const { gap, squareWidth, onLayout } = useSpacing();
	const { urlForKey } = useImage();
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
					<ImageItem
						uri={urlForKey(square.multimedia.image?.small.key)}
						onPress={() => {
							viewEventMediaPage(eventMedia, index);
						}}
					/>
				</Container>
			))}
		</View>
	);
};

export default EventMedia;
