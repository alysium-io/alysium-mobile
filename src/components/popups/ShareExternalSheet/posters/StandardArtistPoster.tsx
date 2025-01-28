import { Avatar, Icon, Text, View } from '@atomic';
import { PublicArtist } from '@flux/api/artist';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEventDateFormatter, useTheme } from '@hooks';
import { StaticEventMap } from '@organisms';
import { BlurView } from '@react-native-community/blur';
import MaskedView from '@react-native-masked-view/masked-view';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { LayoutRectangle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

interface StandardArtistPosterProps {
	posterDimensions: LayoutRectangle;
	artist: PublicArtist;
	events: EventLink[];
}

const StandardArtistPoster: React.FC<StandardArtistPosterProps> = ({
	posterDimensions,
	artist,
	events
}) => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const PROFILE_IMAGE_SIZE = posterDimensions.width * 0.15;
	const PROFILE_IMAGE_CONTAINER_SIZE = PROFILE_IMAGE_SIZE + 11;
	const BANNER_HEIGHT = posterDimensions.height * 0.4;
	const MAX_NUMBER_OF_EVENTS = 4;

	const eventsToDisplay = useMemo(() => {
		return _.orderBy(events, 'event.start_time', 'desc').slice(
			0,
			MAX_NUMBER_OF_EVENTS
		);
	}, [events]);

	const EventMap = useCallback(
		() => (
			<StaticEventMap
				events={events}
				containerProps={{
					margin: 'none',
					style: {
						height: '100%',
						overflow: 'hidden',
						borderRadius: 45
					}
				}}
			/>
		),
		[events]
	);

	return (
		<View
			flex={1}
			style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
		>
			<View style={StyleSheet.absoluteFill}>
				<Avatar
					image={artist.profile_image?.large.key}
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
					<EventMap />
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
						image={artist.profile_image?.large.key}
						defaultImageProps={{
							icon: 'artist'
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
						blurType='extraDark'
						blurAmount={50}
					/>
				</View>
			</MaskedView>
			<Avatar
				image={artist.profile_image?.large.key}
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
			<View flex={1} marginTop='l'>
				<View margin='m'>
					<Text
						variant='section-header-1'
						marginBottom='s'
						color='white'
						textAlign='center'
						adjustsFontSizeToFit
						minimumFontScale={0.7}
						numberOfLines={2}
					>
						{artist.name}
					</Text>
				</View>
				<View flex={1} marginHorizontal='m' rowGap='m'>
					{eventsToDisplay.map((event) => {
						const { getDisplayParts } = useEventDateFormatter(
							event.event.start_time
						);
						const { subtitle } = getDisplayParts();
						return (
							<View
								key={event.event.event_uid}
								flexDirection='row'
								alignItems='center'
								borderBottomWidth={theme.borderWidth.hairline}
								borderBottomColor='palette.neutral.p7'
								paddingBottom='m'
							>
								<View
									marginRight='m'
									style={{
										height: 45,
										width: 45
									}}
								>
									<Avatar image={event.event.profile_image?.small.key} />
								</View>
								<View flex={2} marginRight='m'>
									<Text
										variant='paragraph-large-medium'
										color='palette.neutral.p2'
										marginBottom='s'
									>
										{event.event.name}
									</Text>
									<Text
										variant='paragraph-small'
										color='palette.neutral.p2'
										adjustsFontSizeToFit
										minimumFontScale={0.8}
										numberOfLines={1}
									>
										{event.event.location?.name}
									</Text>
								</View>
								<View>
									<Text variant='paragraph-large' color='palette.neutral.p2'>
										{subtitle}
									</Text>
								</View>
							</View>
						);
					})}
					{events.length > MAX_NUMBER_OF_EVENTS && (
						<Text
							variant='paragraph-small'
							color='palette.neutral.p2'
							textAlign='center'
						>
							... {events.length - MAX_NUMBER_OF_EVENTS} more
						</Text>
					)}
				</View>
				<View
					flexDirection='row'
					justifyContent='center'
					alignItems='center'
					gap='m'
				>
					<Icon name='logo' size='m' color='palette.neutral.p3' />
					<Text variant='paragraph' color='palette.neutral.p3'>
						Follow My Shows on Alysium
					</Text>
				</View>
			</View>
		</View>
	);
};

export default StandardArtistPoster;
