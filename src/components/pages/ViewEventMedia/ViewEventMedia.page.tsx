import { View } from '@atomic';
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
	const { eventMedia, initialIndex } = route.params;
	const { dimensions, onLayout, isLayoutReady } = useLayoutDimensions();
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const [headerTitle, setHeaderTitle] = useState(
		`${initialIndex + 1} of ${eventMedia.length}`
	);

	useEffect(() => {
		setHeaderTitle(`${currentIndex + 1} of ${eventMedia.length}`);
	}, [currentIndex]);

	return (
		<BasePage>
			<ViewEventMediaHeader title={headerTitle} />
			<View flex={1} onLayout={onLayout}>
				{isLayoutReady && eventMedia && (
					<FlatList
						items={orderBy(
							eventMedia,
							[(s) => dayjs(s.created_at).valueOf()],
							['desc']
						).map((item, index) => ({
							eventMedia: item,
							index
						}))}
						currentIndex={currentIndex}
						setCurrentIndex={setCurrentIndex}
						initialIndex={initialIndex}
						dimensions={dimensions}
					/>
				)}
			</View>
		</BasePage>
	);
};

export default ViewEventMediaPage;
