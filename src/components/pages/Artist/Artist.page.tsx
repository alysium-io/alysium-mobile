import { View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { artistEventApiSlice } from '@flux/api/event';
import { MediaType } from '@flux/api/media/types';
import { useImage, usePagination, useToggle } from '@hooks';
import { BasePage, Parallax, useAnimatedFlatListOffset } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { PageError, ParallaxLoading } from '@templates';
import { ArtistPageRouteProp } from '@types';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { ViewToken } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import ArtistPageHeader from './Artist.header';
import BlockedArtistSection from './components/BlockedArtistSection';
import { HistoricalListItemProps } from './components/etc';
import HistoricalListItemCell from './components/HistoricalListItemCell';
import ListHeader from './components/ListHeader';
import NumEventsNotification from './components/NumEventsNotification';
import SubHeader from './components/SubHeader';

const ArtistPage: React.FC = () => {
	const { urlForKey } = useImage();
	const route = useRoute<ArtistPageRouteProp>();

	const { data: artistData, error } =
		artistApiSlice.usePublicFindOneArtistQuery({
			params: { artist_uid: route.params.artist_uid }
		});

	const { data: eventsData } =
		artistEventApiSlice.usePublicFindAllArtistEventsQuery({
			params: { artist_uid: route.params.artist_uid },
			query: {
				page: 1,
				limit: 20
			}
		});

	const { page: historyPage, defaultLimit: historyLimit } = usePagination();
	const { data: historyData } = artistEventApiSlice.useArchiveQuery(
		{
			params: {
				artist_uid: route.params.artist_uid
			},
			query: {
				page: historyPage,
				limit: historyLimit
			}
		},
		{
			selectFromResult: ({ data, ...rest }) => ({
				...rest,
				data: data?.map((item) => ({
					event_uid: item.event.event_uid,
					date: item.event.start_time,
					location: item.event.location?.name,
					number_of_media: item.event.event_media.length,
					event_media: _.orderBy(item.event.event_media, ['order']).map(
						(media) => ({
							event_media_uid: media.event_media_uid,
							uri: urlForKey(
								media.multimedia.media_type === MediaType.image
									? media.multimedia.image?.large.key
									: media.multimedia.video?.media.key
							),
							type: media.multimedia.media_type
						})
					)?.[0]
				}))
			})
		}
	);

	const [currentViewableItem, setCurrentViewableItem] =
		useState<ViewToken | null>(null);
	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			setCurrentViewableItem(
				viewableItems.length > 0
					? viewableItems[viewableItems.length - 1]
					: null
			);
		},
		[]
	);
	const { state: isMuted, toggle: toggleMuted } = useToggle(true);

	const flatListRef =
		useAnimatedRef<Animated.FlatList<HistoricalListItemProps>>();
	const { offset: scrollOffset, scrollHandler } = useAnimatedFlatListOffset();

	const ListHeaderComponent = useCallback(() => {
		return (
			<ListHeader
				artistData={artistData}
				eventsData={eventsData}
				scrollOffset={scrollOffset}
			/>
		);
	}, [artistData, eventsData, scrollOffset]);

	if (error) {
		return <PageError error={error} />;
	}

	if (!artistData || !eventsData) {
		return <ParallaxLoading />;
	}

	if (artistData.is_blocked) {
		return (
			<BasePage>
				<ArtistPageHeader title={artistData.name} artist={artistData} />
				<Parallax
					title={artistData.name}
					image={artistData.profile_image?.large.key}
				>
					<View margin='m'>
						<SubHeader artistData={artistData} />
						<BlockedArtistSection />
					</View>
				</Parallax>
			</BasePage>
		);
	}

	return (
		<BasePage>
			<ArtistPageHeader title={artistData.name} artist={artistData} />
			<Animated.FlatList
				ref={flatListRef}
				data={historyData ?? []}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				onScroll={scrollHandler}
				maxToRenderPerBatch={2}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{
					viewAreaCoveragePercentThreshold: 50
				}}
				ListHeaderComponent={ListHeaderComponent}
				renderItem={({ item, index }) => (
					<HistoricalListItemCell
						{...item}
						index={index}
						currentViewIndex={currentViewableItem?.index ?? -1}
						muted={isMuted}
						toggleMuted={toggleMuted}
					/>
				)}
			/>
			<NumEventsNotification
				eventsData={eventsData}
				show={!!currentViewableItem}
				onPress={() => {
					flatListRef.current?.scrollToOffset({
						offset: 0,
						animated: true
					});
				}}
			/>
		</BasePage>
	);
};

export default ArtistPage;
