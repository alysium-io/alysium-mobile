import { BlurView, Icon, View } from '@atomic';
import { MediaType } from '@flux/api/media/types';
import { useNavigation, useTheme } from '@hooks';
import { DynamicMediaProps } from '@src/utils/hooks/useUploadBulkMedia';
import { NanoId } from '@types';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import Video from 'react-native-video';
import LoadingOverlay from './LoadingOverlay';

const Square: React.FC<DynamicMediaProps & { event_uid: NanoId }> = ({
	event_uid,
	state,
	uri,
	type,
	eventMedia
}) => {
	const { theme } = useTheme();
	const { previewEventMediaPage } = useNavigation();
	const [paused, setPaused] = useState(true);

	return (
		<Pressable
			disabled={!eventMedia || state === 'loading'}
			onPress={() => {
				if (eventMedia) {
					previewEventMediaPage(event_uid, eventMedia);
				}
			}}
		>
			<View
				borderRadius='xl'
				overflow='hidden'
				borderWidth={theme.borderWidth.normal}
				borderColor='border.light'
				backgroundColor='bg.negative.p'
				style={{
					width: 125,
					height: 125
				}}
			>
				{type === MediaType.image ? (
					<Animated.Image
						sharedTransitionTag={
							eventMedia
								? `preview-event-media-${eventMedia.event_media_uid}`
								: undefined
						}
						source={{ uri }}
						style={{
							width: 125,
							height: 125,
							borderRadius: theme.borderRadii.xl,
							overflow: 'hidden'
						}}
						resizeMode='cover'
					/>
				) : (
					<Pressable onPress={() => setPaused(!paused)}>
						<Video
							source={{ uri }}
							paused={paused}
							style={{
								width: 125,
								height: 125
							}}
							resizeMode='cover'
						/>
					</Pressable>
				)}
				{state === 'loading' && <LoadingOverlay />}
			</View>
			{type === MediaType.video && (
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
					<Icon name={paused ? 'play' : 'pause'} size='s' color='white' />
				</BlurView>
			)}
		</Pressable>
	);
};

export default Square;
