import { BlurView, Icon, Image, Text, Video, View } from '@atomic';
import { formatSplitTime } from '@etc';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { MediaType } from '@flux/api/media/types';
import { useImage, useTheme } from '@hooks';
import React, { useState } from 'react';
import { ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { useReorderableDrag } from 'react-native-reorderable-list';
import HandleBar from './HandleBar';

type ListItemProps = ListRenderItemInfo<EventMedia> & {
	onPressMenu: () => void;
};

const ListItem = React.memo(({ item, index, onPressMenu }: ListItemProps) => {
	const drag = useReorderableDrag();
	const { urlForKey } = useImage();
	const { theme } = useTheme();
	const [duration, setDuration] = useState<string | null>(null);

	return (
		<TouchableOpacity activeOpacity={0.8} onLongPress={drag}>
			<View flexDirection='row' alignItems='center' gap='m'>
				<HandleBar />
				<View
					borderRadius='xl'
					borderWidth={theme.borderWidth.normal}
					borderColor='border.light'
					backgroundColor='bg.negative.p'
				>
					{item.multimedia.media_type === MediaType.image ? (
						<Image
							source={{
								uri: urlForKey(item.multimedia.image?.medium.key)
							}}
							style={{
								width: 125,
								height: 125,
								borderRadius: theme.borderRadii.xl
							}}
							resizeMode='cover'
						/>
					) : (
						<Video
							source={{ uri: urlForKey(item.multimedia.video?.media.key) }}
							style={{
								width: 125,
								height: 125,
								borderRadius: theme.borderRadii.xl,
								overflow: 'hidden'
							}}
							paused
							resizeMode='cover'
							onLoad={(data) => setDuration(formatSplitTime(data.duration))}
						/>
					)}
					{item.multimedia.media_type === MediaType.video && (
						<BlurView
							blurType='dark'
							style={{
								position: 'absolute',
								right: 0,
								bottom: 0,
								padding: theme.spacing.s,
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 15
							}}
						>
							<Icon name='play' size='s' color='white' />
						</BlurView>
					)}
				</View>
				<View flex={1}>
					<Text variant='paragraph-medium'>#{index + 1}</Text>
					<Text variant='paragraph-medium'>{item.multimedia.media_type}</Text>
					{duration && item.multimedia.media_type === MediaType.video && (
						<Text variant='paragraph-small' color='text.t'>
							{duration}
						</Text>
					)}
				</View>
				<TouchableOpacity activeOpacity={0.8} onPress={onPressMenu}>
					<View
						height={125}
						justifyContent='center'
						alignItems='center'
						padding='m'
					>
						<Icon name='meatballs' size='l' color='text.q' />
					</View>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
});

export default ListItem;
