import { Avatar, BlurView, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { LayoutRectangle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePosterLayout from '../usePosterLayout';

interface AvatarImageProps {
	event: EventLink;
	posterDimensions: LayoutRectangle;
}

const AvatarImage: React.FC<AvatarImageProps> = ({
	event,
	posterDimensions
}) => {
	const insets = useSafeAreaInsets();
	const { PROFILE_IMAGE_CONTAINER_SIZE, BANNER_HEIGHT, PROFILE_IMAGE_SIZE } =
		usePosterLayout(posterDimensions);

	return (
		<>
			<MaskedView
				style={StyleSheet.absoluteFill}
				maskElement={
					<View
						left={posterDimensions.width / 2 - PROFILE_IMAGE_CONTAINER_SIZE / 2}
						top={insets.top + BANNER_HEIGHT - PROFILE_IMAGE_CONTAINER_SIZE / 2}
						height={PROFILE_IMAGE_CONTAINER_SIZE}
						width={PROFILE_IMAGE_CONTAINER_SIZE}
						borderRadius='round'
						style={{ backgroundColor: 'black' }}
					/>
				}
			>
				<View flex={1}>
					<Avatar
						image={event.event.profile_image?.large.key}
						defaultImageProps={{
							icon: 'event'
						}}
						containerProps={{
							style: {
								height: '100%',
								width: '100%'
							}
						}}
					/>
					<BlurView
						style={StyleSheet.absoluteFill}
						blurType='dark'
						blurAmount={20}
					/>
				</View>
			</MaskedView>
			<Avatar
				image={event.artist?.profile_image?.large.key}
				borderRadius='round'
				defaultImageProps={{
					icon: 'artist'
				}}
				containerProps={{
					style: {
						height: PROFILE_IMAGE_SIZE,
						width: PROFILE_IMAGE_SIZE,
						position: 'absolute',
						left: posterDimensions.width / 2 - PROFILE_IMAGE_SIZE / 2,
						top: insets.top + BANNER_HEIGHT - PROFILE_IMAGE_SIZE / 2,
						borderRadius: 999
					}
				}}
			/>
		</>
	);
};

export default AvatarImage;
