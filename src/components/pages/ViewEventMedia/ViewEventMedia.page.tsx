import { View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { useLayoutDimensions } from '@hooks';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { dayjs } from '@src/etc/dayjs';
import { ViewEventMediaPageRouteProp } from '@types';
import { orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import FlatList from './components/FlatList';
import ViewEventMediaHeader from './ViewEventMedia.header';

const ViewEventMediaPage = () => {
	const route = useRoute<ViewEventMediaPageRouteProp>();
	const { event_uid, initialIndex } = route.params;
	const { dimensions, onLayout, isLayoutReady } = useLayoutDimensions();
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const { data: event } = eventApiSlice.useFindOneEventQuery({
		params: { event_uid }
	});

	const [headerTitle, setHeaderTitle] = useState(
		event ? `${initialIndex + 1} of ${event.event.event_media.length}` : ''
	);

	useEffect(() => {
		setHeaderTitle(
			event ? `${currentIndex + 1} of ${event.event.event_media.length}` : ''
		);
	}, [currentIndex, event]);

	return (
		<BasePage>
			<ViewEventMediaHeader title={headerTitle} />
			<View flex={1} onLayout={onLayout}>
				{isLayoutReady && event && (
					<FlatList
						items={
							orderBy(
								event.event.event_media,
								[(s) => dayjs(s.created_at).valueOf()],
								['desc']
							).map((item, index) => ({
								eventMedia: item,
								index
							})) ?? []
						}
						currentIndex={currentIndex}
						setCurrentIndex={setCurrentIndex}
						initialIndex={initialIndex}
						dimensions={dimensions}
						event={event}
					/>
				)}
			</View>
		</BasePage>
	);
};

export default ViewEventMediaPage;
