import { Icon, Image, Text, View } from '@atomic';
import { MediaType } from '@flux/api/media/types';
import { useNavigation } from '@hooks';
import dayjs from 'dayjs';
import React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import Video from 'react-native-video';
import { HISTORICAL_LIST_ITEM_HEIGHT, HistoricalListItemProps } from './etc';
import HistoricalListItemCellLayoverText from './HistoricalListItemCellLayoverText';

const HistoricalListItemCell: React.FC<HistoricalListItemProps> = ({
	event_uid,
	event_media,
	date,
	location,
	index,
	currentViewIndex,
	muted,
	toggleMuted
}) => {
	const { width } = useWindowDimensions();
	const { viewEventMediaPage } = useNavigation();
	return (
		<Pressable onPress={() => viewEventMediaPage(event_uid, 0)}>
			<View height={HISTORICAL_LIST_ITEM_HEIGHT} width={width}>
				{event_media.type === MediaType.image ? (
					<Image
						source={{ uri: event_media.uri }}
						style={{ width: '100%', height: HISTORICAL_LIST_ITEM_HEIGHT }}
						resizeMode='cover'
					/>
				) : (
					<Video
						source={{
							uri: event_media.uri,
							bufferConfig: {
								minBufferMs: 1000,
								maxBufferMs: 5000,
								bufferForPlaybackMs: 1000,
								bufferForPlaybackAfterRebufferMs: 2000
							}
						}}
						style={{ width: '100%', height: HISTORICAL_LIST_ITEM_HEIGHT }}
						resizeMode='cover'
						repeat
						muted={muted}
						paused={index !== currentViewIndex}
						playInBackground={false}
						ignoreSilentSwitch='ignore'
						mixWithOthers='mix'
					/>
				)}
				<HistoricalListItemCellLayoverText>
					<Text color='white' variant='paragraph-small'>
						{dayjs(date).format('ddd MMM. M')}
					</Text>
					<Text color='white' variant='paragraph-small' numberOfLines={1}>
						{location}
					</Text>
				</HistoricalListItemCellLayoverText>
				<Pressable onPress={toggleMuted}>
					<HistoricalListItemCellLayoverText
						style={{
							right: 0,
							bottom: 0
						}}
					>
						<Icon
							name={muted ? 'volume-off' : 'volume-on'}
							size='m'
							color='white'
						/>
					</HistoricalListItemCellLayoverText>
				</Pressable>
			</View>
		</Pressable>
	);
};

export default HistoricalListItemCell;
