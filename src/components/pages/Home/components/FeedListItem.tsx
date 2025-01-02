import { Avatar, LView, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import {
	useDriveTime,
	useEventDateFormatter,
	useImage,
	useLocation,
	useNavigation
} from '@hooks';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FadeIn } from 'react-native-reanimated';
import FeedListItemMediaCarousel from './FeedListItemMediaCarousel';

const FeedListItem: React.FC<EventLink> = (event) => {
	const { artistPage, eventPage } = useNavigation();
	const { urlForKey } = useImage();
	const dateFormatter = useEventDateFormatter(event.event.start_time);
	const locationApi = useLocation(event.event.location);
	const { formattedDriveTime } = useDriveTime(event.event.location);
	const semanticDate = dateFormatter.semantic();
	const address = locationApi.build([
		{ type: 'street_number' },
		{ type: 'route', nameLength: 'short_name' }
	]);

	const locality = locationApi.build([
		{ type: 'locality' },
		{ type: 'postal_code' }
	]);

	const getImages = () => {
		const galleryImages =
			event.event.gallery?.items.map((item) => ({
				uri: urlForKey(item.multimedia.image?.large.key)
			})) || [];
		const profileImage = event.event.profile_image?.large.key
			? [{ uri: urlForKey(event.event.profile_image?.large.key) }]
			: [];
		return [...profileImage, ...galleryImages];
	};

	const images = getImages();

	const onPress = () =>
		eventPage(event.event.event_uid, {
			from: 'HomePage',
			to: 'EventPage',
			to_uid: event.event.event_uid,
			using: 'HOME_FEED_ITEM_EVENT'
		});

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<LView key={event.event.event_uid} marginBottom='m'>
				{/* Artist header */}
				<View flexDirection='row' alignItems='center' margin='m'>
					<TouchableWithoutFeedback
						onPress={() =>
							artistPage(event.artist.artist_uid, {
								from: 'HomePage',
								to: 'ArtistPage',
								to_uid: event.artist.artist_uid,
								using: 'HOME_FEED_ITEM_ARTIST_PROFILE_IMAGE_AVATAR'
							})
						}
					>
						<View height={40} width={40}>
							<Avatar image={event.artist?.profile_image?.small.key} />
						</View>
					</TouchableWithoutFeedback>
					<View flex={1} marginLeft='m'>
						<TouchableWithoutFeedback
							onPress={() =>
								eventPage(event.event.event_uid, {
									from: 'HomePage',
									to: 'EventPage',
									to_uid: event.event.event_uid,
									using: 'HOME_FEED_ITEM_EVENT_NAME'
								})
							}
						>
							<Text marginBottom='xs'>{event.event?.name}</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							onPress={() =>
								artistPage(event.artist.artist_uid, {
									from: 'HomePage',
									to: 'ArtistPage',
									to_uid: event.artist.artist_uid,
									using: 'HOME_FEED_ITEM_ARTIST_NAME'
								})
							}
						>
							<Text color='text.q'>{event.artist?.name}</Text>
						</TouchableWithoutFeedback>
					</View>
				</View>

				{/* Image Display */}
				<FeedListItemMediaCarousel images={images} onPress={onPress} />

				{/* Event details */}
				<View margin='m' marginTop={images.length > 1 ? 'xs' : 'm'}>
					<View flexDirection='row' justifyContent='space-between'>
						<View>
							{semanticDate && <Text marginBottom='xs'>{semanticDate}</Text>}
							<Text>{dateFormatter.startDate()}</Text>
						</View>
						<LView>
							{formattedDriveTime && (
								<LView entering={FadeIn.delay(100).duration(200)}>
									<Text textAlign='right' marginBottom='xs'>
										{formattedDriveTime}
									</Text>
								</LView>
							)}
							<LView>
								<Text textAlign='right' marginBottom='xs'>
									{address}
								</Text>
							</LView>
							<LView>
								<Text textAlign='right'>{locality}</Text>
							</LView>
						</LView>
					</View>
				</View>
			</LView>
		</TouchableWithoutFeedback>
	);
};

export default FeedListItem;
