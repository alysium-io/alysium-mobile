import { BlurView, Icon, Image, Video, View } from '@atomic';
import { MediaType } from '@flux/api/media/types';
import { useTheme } from '@hooks';
import { DynamicMediaProps } from '@src/utils/hooks/useUploadBulkMedia';
import { NanoId } from '@types';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import LoadingOverlay from './LoadingOverlay';

const Square: React.FC<DynamicMediaProps & { event_uid: NanoId }> = ({
	event_uid,
	state,
	uri,
	type,
	eventMedia
}) => {
	const { theme } = useTheme();
	const [paused, setPaused] = useState(true);

	return (
		<View>
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
					<Image
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
							repeat
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
		</View>
	);
};

export default Square;
