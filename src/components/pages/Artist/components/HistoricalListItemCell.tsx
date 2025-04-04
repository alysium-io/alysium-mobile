import { Icon, Image, MediaLayover, Text, Video, View } from '@atomic';
import { MediaType } from '@flux/api/media/types';
import { useNavigation, useTransientAppState } from '@hooks';
import dayjs from 'dayjs';
import React from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { HISTORICAL_LIST_ITEM_HEIGHT, HistoricalListItemProps } from './etc';

const HistoricalListItemCell: React.FC<HistoricalListItemProps> = ({
	event_uid,
	event_media,
	date,
	location,
	index,
	currentViewIndex
}) => {
	const { width } = useWindowDimensions();
	const { viewEventMediaPage } = useNavigation();
	const { soundEnabled, toggleSoundEnabled } = useTransientAppState();

	const onPress = () => {
		viewEventMediaPage(event_uid, 0);
	};

	return (
		<Pressable onPress={onPress}>
			<View height={HISTORICAL_LIST_ITEM_HEIGHT} width={width}>
				{event_media.type === MediaType.image ? (
					<Image
						source={{ uri: event_media.uri }}
						style={{ width: '100%', height: HISTORICAL_LIST_ITEM_HEIGHT }}
						resizeMode='cover'
					/>
				) : (
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
				)}
				<MediaLayover>
					<Text color='white' variant='paragraph-small'>
						{dayjs(date).format('ddd MMM. M')}
					</Text>
					<Text color='white' variant='paragraph-small' numberOfLines={1}>
						{location}
					</Text>
				</MediaLayover>
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
			</View>
		</Pressable>
	);
};

export default HistoricalListItemCell;
