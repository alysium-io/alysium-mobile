import { Avatar, Icon, Image, MediaLayover, Text, Video, View } from '@atomic';
import { MediaType } from '@flux/api/media/types';
import { useNavigation, useTransientAppState } from '@hooks';
import dayjs from 'dayjs';
import React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { HISTORICAL_LIST_ITEM_HEIGHT, HistoricalListItemProps } from './etc';

const MainContent: React.FC<HistoricalListItemProps> = ({
	event_media,
	profile_image,
	index,
	currentViewIndex
}) => {
	const { soundEnabled } = useTransientAppState();

	if (!event_media) {
		if (!profile_image) {
			return (
				<View
					backgroundColor='bg.s'
					gap='m'
					style={{
						width: '100%',
						height: HISTORICAL_LIST_ITEM_HEIGHT,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Icon name='event' size='l' />
					<Text variant='paragraph-small'>No media</Text>
				</View>
			);
		} else {
			return (
				<Avatar
					image={profile_image}
					borderRadius='none'
					defaultImageProps={{
						icon: 'event'
					}}
				/>
			);
		}
	}

	if (event_media.type === MediaType.image) {
		return (
			<Image
				source={{ uri: event_media.uri }}
				style={{ width: '100%', height: HISTORICAL_LIST_ITEM_HEIGHT }}
				resizeMode='cover'
			/>
		);
	}

	if (event_media.type === MediaType.video) {
		return (
			<Video
				source={{ uri: event_media.uri }}
				style={{ width: '100%', height: HISTORICAL_LIST_ITEM_HEIGHT }}
				resizeMode='cover'
				repeat
				muted={!soundEnabled}
				paused={index !== currentViewIndex}
				playInBackground={false}
				ignoreSilentSwitch='ignore'
				mixWithOthers='mix'
			/>
		);
	}

	return null;
};

const HistoricalListItemCell: React.FC<HistoricalListItemProps> = ({
	artist_uid,
	event_uid,
	event_media,
	date,
	location,
	index,
	currentViewIndex,
	number_of_media,
	profile_image
}) => {
	const { width } = useWindowDimensions();
	const { viewEventMediaPage, eventPage } = useNavigation();
	const { soundEnabled, toggleSoundEnabled } = useTransientAppState();

	const onPress = () => {
		viewEventMediaPage(event_uid, 0);
	};

	return (
		<Pressable onPress={onPress} disabled={!event_media}>
			<View height={HISTORICAL_LIST_ITEM_HEIGHT} width={width}>
				<MainContent
					artist_uid={artist_uid}
					event_uid={event_uid}
					event_media={event_media}
					index={index}
					currentViewIndex={currentViewIndex}
					date={date}
					location={location}
					number_of_media={number_of_media}
					profile_image={profile_image}
				/>
				<MediaLayover>
					<Pressable
						onPress={() =>
							eventPage(event_uid, {
								from: 'ArtistPage',
								from_uid: artist_uid,
								to: 'EventPage',
								to_uid: event_uid,
								using: 'ARTIST_EPK_NAVIGATION_BUTTON'
							})
						}
					>
						<Text color='white' variant='paragraph-small'>
							{dayjs(date).format('ddd MMM. M')}
						</Text>
						<Text color='white' variant='paragraph-small' numberOfLines={1}>
							{location}
						</Text>
					</Pressable>
				</MediaLayover>
				{event_media?.type === MediaType.video && (
					<Pressable onPress={toggleSoundEnabled}>
						<MediaLayover
							style={{
								right: 0,
								bottom: 0
							}}
						>
							<Icon
								name={soundEnabled ? 'volume-on' : 'volume-off'}
								size='m'
								color='white'
							/>
						</MediaLayover>
					</Pressable>
				)}
			</View>
		</Pressable>
	);
};

export default HistoricalListItemCell;
