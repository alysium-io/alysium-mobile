import { Avatar, Icon, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEventDateFormatter, useLocation } from '@hooks';
import { BlurView } from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { LayoutRectangle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

interface StandardEventPosterProps {
	posterDimensions: LayoutRectangle;
	event: EventLink;
}

const StandardEventPoster: React.FC<StandardEventPosterProps> = ({
	posterDimensions,
	event
}) => {
	const eventDateFormatter = useEventDateFormatter(event.event.start_time);
	const { title: dateTitle, subtitle: dateSubtitle } =
		eventDateFormatter.getDisplayParts();
	const locationFormatter = useLocation(event.event.location);
	const { title: locationTitle, subtitle: locationSubtitle } =
		locationFormatter.getDisplayParts();

	const insets = useSafeAreaInsets();
	const PROFILE_IMAGE_SIZE = posterDimensions.width * 0.15;
	const PROFILE_IMAGE_CONTAINER_SIZE = PROFILE_IMAGE_SIZE + 11;
	const BANNER_HEIGHT = posterDimensions.height * 0.5;

	return (
		<View
			flex={1}
			style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
		>
			<View style={StyleSheet.absoluteFill}>
				<Avatar
					image={event.event.profile_image?.large.key}
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
					blurAmount={50}
				/>
			</View>
			<View margin='m' marginTop='none'>
				<Shadow
					startColor='rgba(255, 255, 255, 0.05)'
					endColor='rgba(255, 255, 255, 0)'
					distance={15}
					style={{
						height: BANNER_HEIGHT,
						width: '100%',
						borderRadius: 45
					}}
				>
					<Avatar
						image={event.event.profile_image?.large.key}
						defaultImageProps={{
							icon: 'event',
							iconProps: {
								size: 'xl'
							}
						}}
						containerProps={{
							style: {
								height: BANNER_HEIGHT,
								width: '100%',
								borderRadius: 45
							}
						}}
					/>
				</Shadow>
			</View>
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
			<View flex={1} marginTop='m'>
				<View
					flexDirection='row'
					justifyContent='space-between'
					marginBottom='m'
				>
					<View marginHorizontal='m' flex={1}>
						<Text
							variant='paragraph-medium'
							color='white'
							marginBottom='xs'
							adjustsFontSizeToFit
							numberOfLines={2}
						>
							{dateTitle}
						</Text>
						<Text
							variant='paragraph-small'
							color='palette.neutral.p4'
							adjustsFontSizeToFit
							numberOfLines={3}
						>
							{dateSubtitle}
						</Text>
					</View>

					{/** Spacer for profile image */}
					<View
						style={{
							aspectRatio: 1,
							width: PROFILE_IMAGE_CONTAINER_SIZE - 30,
							backgroundColor: 'transparent'
						}}
					/>

					<View marginHorizontal='m' flex={1}>
						{locationTitle && (
							<Text
								variant='paragraph-medium'
								textAlign='right'
								color='white'
								marginBottom='xs'
								adjustsFontSizeToFit
								numberOfLines={2}
							>
								{locationTitle}
							</Text>
						)}
						{locationSubtitle && (
							<Text
								variant='paragraph-small'
								textAlign='right'
								color='palette.neutral.p4'
								numberOfLines={2}
								adjustsFontSizeToFit
							>
								{locationSubtitle}
							</Text>
						)}
					</View>
				</View>
				<View
					justifyContent='center'
					alignItems='center'
					paddingHorizontal='xl'
				>
					<Text
						variant='paragraph'
						color='palette.neutral.p3'
						marginBottom='m'
						textAlign='center'
						adjustsFontSizeToFit
						minimumFontScale={0.5}
						numberOfLines={4}
					>
						{event.event.about}
					</Text>
					<Text
						variant='page-header'
						textAlign='center'
						marginBottom='s'
						color='white'
						adjustsFontSizeToFit
						minimumFontScale={0.4}
						numberOfLines={1}
					>
						{event.artist.name}
					</Text>
					<Text
						variant='paragraph-large'
						textAlign='center'
						style={{ fontSize: 22 }}
						marginBottom='m'
						color='white'
						adjustsFontSizeToFit
						minimumFontScale={0.4}
						numberOfLines={1}
					>
						{event.event.name}
					</Text>
					<Icon name='logo' size='m' color='white' />
				</View>
			</View>
		</View>
	);
};

export default StandardEventPoster;
