import { AView } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetControlApi, useNavigation, useTheme } from '@hooks';
import { Button } from '@molecules';
import { BottomSheet } from '@organisms';
import React, { useMemo } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import {
	Extrapolation,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventMapSheetItemBackground from './components/EventMapSheetItemBackground';
import EventMapSheetItemHeader from './components/EventMapSheetItemHeader';
import EventMapSheetItemSubHeader from './components/EventMapSheetItemSubHeader';
import OrganizerSection from './components/OrganizerSection';

const useSelectedEventMapSheetDimensions = () => {
	const { height } = useWindowDimensions();
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const MINIMIZED_IMAGE_SIZE = 100;
	const TOTAL_VERTICAL_MARGIN = theme.spacing.m * 2;
	const MINIMIZED_SNAP_POINT =
		MINIMIZED_IMAGE_SIZE + TOTAL_VERTICAL_MARGIN + insets.bottom;
	const MAXIMIZED_SNAP_POINT = height / 2; // we use value here so we can interpolate and animate later
	const snapPoints = useMemo(
		() => [MINIMIZED_SNAP_POINT, MAXIMIZED_SNAP_POINT],
		[MINIMIZED_SNAP_POINT, MAXIMIZED_SNAP_POINT]
	);
	const animatedPosition = useSharedValue(0);
	const interpolatedAnimatedPosition = useDerivedValue(() =>
		interpolate(
			animatedPosition.value,
			[height - snapPoints[0], height - snapPoints[1]],
			[0, 1],
			Extrapolation.CLAMP
		)
	);
	return {
		MINIMIZED_SNAP_POINT,
		MAXIMIZED_SNAP_POINT,
		snapPoints,
		animatedPosition,
		interpolatedAnimatedPosition
	};
};

interface SelectedEventMapSheetProps {
	event: EventLink | null;
	bottomSheetControlApi: BottomSheetControlApi;
	onPressMinimizedHeader: (event: EventLink) => void;
}

const SelectedEventMapSheet: React.FC<SelectedEventMapSheetProps> = ({
	event,
	bottomSheetControlApi,
	onPressMinimizedHeader
}) => {
	const { artistPage, eventPage } = useNavigation();
	const { snapPoints, animatedPosition, interpolatedAnimatedPosition } =
		useSelectedEventMapSheetDimensions();

	const animatedMaximizedContainerStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolatedAnimatedPosition.value
		};
	}, []);

	const onPressOrganizer = () => {
		if (event?.artist) {
			bottomSheetControlApi.close();
			artistPage(event.artist.artist_uid, {
				to: 'ArtistPage',
				to_uid: event.artist.artist_uid,
				from: 'EventPage',
				from_uid: event.event.event_uid,
				using: 'ARTIST_EVENT_ORGANIZER_CONTENT_LIST_ITEM'
			});
		}
	};

	const onPressGoToEvent = () => {
		if (event?.event) {
			bottomSheetControlApi.close();
			eventPage(event.event.event_uid, {
				to: 'EventPage',
				to_uid: event.event.event_uid,
				from: 'HomePage',
				from_uid: event.event.event_uid,
				using: 'EVENT_MAP_EVENT_CONTENT_LIST_ITEM'
			});
		}
	};

	return (
		<BottomSheet
			snapPoints={snapPoints}
			index={-1} // Start closed
			enableDynamicSizing={false}
			handleComponent={null}
			backdropComponent={null}
			enableContentPanningGesture={true}
			enablePanDownToClose={true}
			animatedPosition={animatedPosition}
			{...bottomSheetControlApi.controlProps}
		>
			<BottomSheetScrollView
				style={{ borderRadius: 25 }}
				showsVerticalScrollIndicator={false}
			>
				<AView
					key={event?.event.event_uid}
					entering={FadeIn.duration(500)}
					exiting={FadeOut.duration(500)}
					flex={1}
				>
					{/** Background */}
					<EventMapSheetItemBackground event={event} />

					<TouchableOpacity
						disabled={bottomSheetControlApi.currentIndex === 1}
						onPress={() => {
							if (event) {
								onPressMinimizedHeader(event);
							}
						}}
					>
						<EventMapSheetItemHeader
							event={event}
							animatedPosition={interpolatedAnimatedPosition}
						/>
					</TouchableOpacity>

					<AView style={animatedMaximizedContainerStyle}>
						<EventMapSheetItemSubHeader event={event} />
						<Button
							text='Go to Event'
							onPress={onPressGoToEvent}
							containerProps={{
								margin: 'm',
								marginBottom: 'xl'
							}}
						/>
						<OrganizerSection event={event} onPress={onPressOrganizer} />
					</AView>
				</AView>
			</BottomSheetScrollView>
		</BottomSheet>
	);
};

export default SelectedEventMapSheet;
