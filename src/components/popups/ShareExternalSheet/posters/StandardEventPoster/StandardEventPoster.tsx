import { QRCode, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEventDateFormatter, useHyperlink, useLocation } from '@hooks';
import React from 'react';
import { LayoutRectangle } from 'react-native';
import BottomInsetGradient from '../../components/BottomInsetGradient';
import TopInsetGradient from '../../components/TopInsetGradient';
import FollowOnAlysium from '../components/FollowOnAlysium';
import AvatarImage from './components/AvatarImage';
import BackgroundBlur from './components/BackgroundBlur';
import BannerImage from './components/BannerImage';
import usePosterLayout from './usePosterLayout';

interface StandardEventPosterProps {
	posterDimensions: LayoutRectangle;
	event: EventLink;
}

const StandardEventPoster: React.FC<StandardEventPosterProps> = ({
	posterDimensions,
	event
}) => {
	const { eventPageHyperlink } = useHyperlink();
	const eventDateFormatter = useEventDateFormatter(event.event.start_time);
	const { title: dateTitle, subtitle: dateSubtitle } =
		eventDateFormatter.getDisplayParts();
	const locationFormatter = useLocation(event.event.location);
	const { title: locationTitle, subtitle: locationSubtitle } =
		locationFormatter.getDisplayParts();

	const { PROFILE_IMAGE_CONTAINER_SIZE, BANNER_HEIGHT } =
		usePosterLayout(posterDimensions);

	return (
		<View flex={1}>
			<TopInsetGradient />
			<BackgroundBlur event={event} />
			<BannerImage event={event} height={BANNER_HEIGHT} />
			<AvatarImage event={event} posterDimensions={posterDimensions} />
			<View flex={1}>
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
								minimumFontScale={0.6}
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
								minimumFontScale={0.6}
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
					flex={1}
				>
					<Text
						variant='page-header'
						textAlign='center'
						marginBottom='s'
						color='white'
						adjustsFontSizeToFit
						minimumFontScale={0.4}
						numberOfLines={1}
					>
						{event.event.name}
					</Text>
					<Text
						variant='paragraph-medium'
						textAlign='center'
						marginBottom='l'
						color='palette.neutral.p1'
						adjustsFontSizeToFit
						minimumFontScale={0.4}
						numberOfLines={1}
					>
						by {event.artist.name}
					</Text>
					<View flex={1} justifyContent='center' alignItems='center'>
						<View
							padding='m'
							shadowColor='white'
							shadowOffset={{ width: 0, height: 0 }}
							shadowOpacity={0.6}
							shadowRadius={3.84}
							style={{
								borderRadius: 35,
								backgroundColor: 'white'
							}}
						>
							<QRCode
								data={eventPageHyperlink(event.event.event_uid)}
								size={4}
								color='black'
								gradient={{
									type: 'linear',
									options: {
										start: [0, 0],
										end: [1, 1],
										colors: ['#da0c8b', '#00bfff'],
										locations: [0, 1]
									}
								}}
							/>
						</View>
					</View>
				</View>
				<FollowOnAlysium />
			</View>
			<BottomInsetGradient />
		</View>
	);
};

export default StandardEventPoster;
