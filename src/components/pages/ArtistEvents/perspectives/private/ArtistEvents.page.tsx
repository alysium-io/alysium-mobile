import { artistApiSlice } from '@flux/api/artist';
import { artistEventApiSlice } from '@flux/api/event';
import { useImage, useNavigation, usePagination } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ArtistEventsPageRouteProp } from '@types';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ArtistEventsPageHeader from './ArtistEvents.header';

const ArtistEvents = () => {
	const { params } = useRoute<ArtistEventsPageRouteProp>();
	const { artistEventPage } = useNavigation();
	const { urlForKey } = useImage();
	const { data: artistData } = artistApiSlice.usePrivateFindOneArtistQuery({
		params: {
			artist_uid: params.artist_uid
		}
	});
	const { page, defaultLimit, nextPage } = usePagination();
	const { data } = artistEventApiSlice.usePrivateFindAllArtistEventsQuery({
		params: {
			artist_uid: params.artist_uid
		},
		query: {
			page,
			limit: defaultLimit
		}
	});

	if (!artistData || !data) return null;

	return (
		<BasePage>
			<ArtistEventsPageHeader title={artistData.name} />
			<FlatList
				data={data}
				onEndReached={nextPage}
				onEndReachedThreshold={0.2}
				keyExtractor={(item) => item.event.event_uid}
				renderItem={({ item }) => (
					<ContentListItem
						key={item.event.event_uid}
						onPress={() =>
							artistEventPage(item.event.event_uid, {
								from: 'ArtistPage',
								from_uid: artistData.artist_uid,
								to: 'ArtistEventPage',
								to_uid: item.event.event_uid,
								using: 'ARTIST_PAGE_EVENT_CONTENT_LIST_ITEM'
							})
						}
						titleTextProps={{
							title: item.event.name,
							bottomSubtext: item.event.status
						}}
						profileImageProps={{
							image: urlForKey(item.event.profile_image?.small.key),
							borderRadius: 'none',
							defaultImageProps: {
								icon: 'event'
							}
						}}
					/>
				)}
			/>
		</BasePage>
	);
};

export default ArtistEvents;
