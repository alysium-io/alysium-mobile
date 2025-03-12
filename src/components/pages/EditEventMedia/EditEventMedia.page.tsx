import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { eventMediaApiSlice } from '@flux/api/event-media';
import { ReorderEventMediaBodyDto } from '@flux/api/event-media/dto/event-media-reorder.dto';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { useRefresh, useSheet, useTheme } from '@hooks';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { PageError } from '@templates';
import { EditEventMediaPageRouteProp } from '@types';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ListRenderItem, RefreshControl } from 'react-native';
import ReorderableList, {
	ReorderableListReorderEvent,
	reorderItems
} from 'react-native-reorderable-list';
import EditEventMediaHeader from './EditEventMedia.header';
import ListItem from './components/ListItem';
import ListItemMenuSheet from './sheets/ListItemMenuSheet';

const EditEventMediaPage = () => {
	const { params } = useRoute<EditEventMediaPageRouteProp>();
	const { artist_uid } = useArtistAppContext();
	const { theme } = useTheme();
	const [reorderEventMediaMutation] =
		eventMediaApiSlice.useReorderEventMediaMutation();

	const individualListItemSheetApi = useSheet();
	const [selectedItem, setSelectedItem] = useState<EventMedia | null>(null);

	const {
		data: eventData,
		refetch,
		error
	} = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			event_uid: params.event_uid,
			artist_uid
		}
	});
	const refreshControl = useRefresh(refetch);

	const [mediaItems, setMediaItems] = useState<EventMedia[]>(
		eventData?.event.event_media
			? _.orderBy(eventData.event.event_media, 'order')
			: []
	);

	useEffect(() => {
		if (!_.isEqual(eventData?.event.event_media, mediaItems)) {
			setMediaItems(_.orderBy(eventData?.event.event_media, 'order'));
		}
	}, [eventData]);

	const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
		setMediaItems((value) => {
			const reorderedItems = reorderItems(value, from, to);
			const reorderEventMediaBodyDto: ReorderEventMediaBodyDto = {
				items: reorderedItems.map((item, idx) => ({
					event_media_uid: item.event_media_uid,
					order: idx
				}))
			};
			reorderEventMediaMutation({
				params: {
					artist_uid,
					event_uid: params.event_uid
				},
				body: reorderEventMediaBodyDto
			});
			return reorderedItems;
		});
	};

	const renderItem: ListRenderItem<EventMedia> = (props) => (
		<ListItem
			{...props}
			onPressMenu={() => {
				setSelectedItem(props.item);
				individualListItemSheetApi.open();
			}}
		/>
	);

	if (error) {
		return <PageError error={error} />;
	}

	return (
		<BasePage>
			<EditEventMediaHeader event_uid={params.event_uid} />
			<ReorderableList
				data={mediaItems}
				onReorder={handleReorder}
				renderItem={renderItem}
				keyExtractor={(item) => item.event_media_uid}
				contentContainerStyle={{
					padding: theme.spacing.m,
					rowGap: theme.spacing.m
				}}
				animationDuration={300}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl {...refreshControl} />}
			/>
			<ListItemMenuSheet
				sheetApi={individualListItemSheetApi}
				event_uid={params.event_uid}
				eventMedia={selectedItem}
			/>
		</BasePage>
	);
};

export default EditEventMediaPage;
