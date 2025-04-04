import { Avatar, Text, View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { artistEventApiSlice } from '@flux/api/event';
import { useSplitEventsByComplexStatus, useTheme, withPoke } from '@hooks';
import { NanoId } from '@types';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated';
import ActionButtons from './ActionButtons';
import EventsMap from './EventsMap';
import EventsSection from './EventsSection';
import LiveEventsSection from './LiveEventsSection';
import SubHeader from './SubHeader';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export const BANNER_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.35;

type ListHeaderProps = {
	artist_uid: NanoId;
	scrollOffset: SharedValue<number>;
};

const ListHeader: React.FC<ListHeaderProps> = React.memo(
	({ artist_uid, scrollOffset }) => {
		const { theme } = useTheme();

		const { data: artistData } = artistApiSlice.usePublicFindOneArtistQuery({
			params: { artist_uid }
		});

		const { data: eventsData } =
			artistEventApiSlice.usePublicFindAllArtistEventsQuery({
				params: { artist_uid },
				query: {
					page: 1,
					limit: 20
				}
			});

		const { data: historyData } = artistEventApiSlice.useArchiveQuery({
			params: {
				artist_uid
			},
			query: {
				page: 1,
				limit: 20
			}
		});

		const { live, coming_up } = useSplitEventsByComplexStatus(eventsData);
		withPoke({
			interval: 1,
			enabled: true,
			checkFn: () => ({ live, coming_up }),
			name: 'ArtistPage'
		});

		const imageAnimatedStyle = useAnimatedStyle(() => {
			return {
				transform: [
					{
						translateY: interpolate(
							scrollOffset.value,
							[-BANNER_IMAGE_HEIGHT, 0, BANNER_IMAGE_HEIGHT],
							[-BANNER_IMAGE_HEIGHT / 2, 0, BANNER_IMAGE_HEIGHT * 0.75]
						)
					},
					{
						scale: interpolate(
							scrollOffset.value,
							[-BANNER_IMAGE_HEIGHT, 0, BANNER_IMAGE_HEIGHT],
							[2, 1, 1]
						)
					}
				]
			};
		}, []);

		const imageTitleStyle = useAnimatedStyle(() => {
			return {
				opacity: interpolate(
					scrollOffset.value,
					[0, BANNER_IMAGE_HEIGHT * 0.8],
					[1, 0],
					Extrapolation.CLAMP
				)
			};
		}, []);

		if (!artistData || !eventsData) return null;

		return (
			<>
				<Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
					<Avatar
						image={artistData.profile_image?.large.key}
						defaultImageProps={{
							icon: 'artist',
							containerProps: {
								style: {
									width: '100%',
									aspectRatio: undefined
								}
							}
						}}
						borderRadius='none'
					/>
				</Animated.View>
				<Animated.View style={[styles.titleContainer, imageTitleStyle]}>
					<Text
						variant='page-header'
						color={
							artistData.profile_image?.large.key
								? 'palette.neutral.p1'
								: 'text.p'
						}
						padding='m'
						width='100%'
						style={[
							styles.title,
							artistData.profile_image?.large.key
								? styles.titleShadow
								: undefined
						]}
						adjustsFontSizeToFit
						numberOfLines={1}
						maxFontSizeMultiplier={1.2}
						minimumFontScale={0.6}
					>
						{artistData.name}
					</Text>
				</Animated.View>
				<View
					borderTopColor='border.medium'
					borderTopWidth={theme.borderWidth.thick}
					backgroundColor='bg.p'
				>
					<View margin='m'>
						<SubHeader artistData={artistData} />
						<ActionButtons artistData={artistData} />
					</View>
					<LiveEventsSection artistData={artistData} eventsData={eventsData} />
					<EventsSection artistData={artistData} eventsData={eventsData} />
					{eventsData?.length > 0 && (
						<EventsMap eventsData={eventsData} artistData={artistData} />
					)}
					{historyData?.length && historyData.length > 0 && (
						<View
							margin='m'
							marginBottom='none'
							paddingBottom='m'
							borderBottomWidth={theme.borderWidth.hairline}
							borderBottomColor='border.light'
						>
							<Text variant='section-header-2'>Past Events</Text>
						</View>
					)}
				</View>
			</>
		);
	}
);

const styles = StyleSheet.create({
	imageContainer: {
		width: '100%',
		height: BANNER_IMAGE_HEIGHT
	},
	image: {
		height: '100%',
		width: '100%'
	},
	titleContainer: {
		width: '100%',
		height: BANNER_IMAGE_HEIGHT,
		position: 'absolute'
	},
	title: {
		position: 'absolute',
		bottom: 0
	},
	titleShadow: {
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10
	}
});

export default ListHeader;
