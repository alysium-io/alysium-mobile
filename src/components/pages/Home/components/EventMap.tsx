import { AView, MapView, View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useMapRegionDetection, useNavigation, useTheme } from '@hooks';
import { Button } from '@molecules';
import { BottomSheet } from '@organisms';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import RNMapView, { Region } from 'react-native-maps';
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
import Toast from 'react-native-toast-message';
import useBottomSheetControl from '../useBottomSheetControl';
import EventMapMarker from './EventMapMarker';
import EventMapSheetItemBackground from './EventMapSheetItemBackground';
import EventMapSheetItemHeader from './EventMapSheetItemHeader';
import EventMapSheetItemSubHeader from './EventMapSheetItemSubHeader';
import OrganizerSection from './OrganizerSection';

interface EventMapProps {
	initialRegion: Region;
}

const EventMap: React.FC<EventMapProps> = ({ initialRegion }) => {
	const { height } = useWindowDimensions();
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const MINIMIZED_IMAGE_SIZE = 100;
	const TOTAL_VERTICAL_MARGIN = theme.spacing.m * 2;
	const MINIMIZED_SNAP_POINT =
		MINIMIZED_IMAGE_SIZE + TOTAL_VERTICAL_MARGIN + insets.bottom;
	const MAXIMIZED_SNAP_POINT = height / 2; // we use value here so we can interpolate and animate later
	const { artistPage, eventPage } = useNavigation();

	const { region, onRegionChangeComplete } = useMapRegionDetection();
	const [selectedEvent, setSelectedEvent] = useState<EventLink | null>(null);
	const mapRef = useRef<RNMapView>(null);
	const { data: eventData } = eventApiSlice.useNearbyEventsQuery({
		query: {
			latitude: region?.latitude,
			longitude: region?.longitude,
			radius: region?.radius
		}
	});

	const snapPoints = useMemo(
		() => [MINIMIZED_SNAP_POINT, MAXIMIZED_SNAP_POINT],
		[]
	);
	const { controlProps, currentIndex, snap, close } = useBottomSheetControl();
	const handleMapDrag = () => {
		if (currentIndex === 1) {
			snap(0);
		}
	};

	const handleEventPress = (event: EventLink) => {
		if (event.event.location && mapRef.current) {
			// The purpose of this is to adjust the point that
			// we animate to slightly upwards because we will
			// animated the bottom sheet into view which takes
			// up about 50% of the screen. So we want to actually
			// animate the marker to about 1/4 of the way down
			// from the top of the screen. This is totally an arbitrary
			// estimate and should be revisited with actual math at some point.
			const SCREEN_ADJUSTMENT_DELTA = 0.03;

			mapRef.current.animateToRegion(
				{
					latitude: event.event.location.latitude - SCREEN_ADJUSTMENT_DELTA,
					longitude: event.event.location.longitude,
					latitudeDelta: 0.15,
					longitudeDelta: 0.15
				},
				800
			);
		}

		setSelectedEvent(event);
		snap(1);
	};

	const animatedPosition = useSharedValue(0);
	const interpolatedAnimatedPosition = useDerivedValue(() =>
		interpolate(
			animatedPosition.value,
			[height - snapPoints[0], height - snapPoints[1]],
			[0, 1],
			Extrapolation.CLAMP
		)
	);

	const animatedMaximizedContainerStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolatedAnimatedPosition.value
		};
	}, []);

	const onPressOrganizer = () => {
		if (selectedEvent?.artist) {
			close();
			artistPage(selectedEvent.artist.artist_uid, {
				to: 'ArtistPage',
				to_uid: selectedEvent.artist.artist_uid,
				from: 'EventPage',
				from_uid: selectedEvent.event.event_uid,
				using: 'ARTIST_EVENT_ORGANIZER_CONTENT_LIST_ITEM'
			});
		}
	};

	const onPressGoToEvent = () => {
		if (selectedEvent?.event) {
			close();
			eventPage(selectedEvent.event.event_uid, {
				to: 'EventPage',
				to_uid: selectedEvent.event.event_uid,
				from: 'HomePage',
				from_uid: selectedEvent.event.event_uid,
				using: 'EVENT_MAP_EVENT_CONTENT_LIST_ITEM'
			});
		}
	};

	useEffect(() => {
		mapRef.current?.animateToRegion(initialRegion, 1000);
	}, [initialRegion]);

	useEffect(() => {
		if (!eventData?.length) {
			Toast.show({
				text1: 'No events found',
				text2: 'Search a different area or come back later'
			});
		}
	}, [eventData]);

	return (
		<View flex={1}>
			<MapView
				ref={mapRef}
				style={{ flex: 1 }}
				onRegionChangeComplete={onRegionChangeComplete}
				showsUserLocation={true}
				moveOnMarkerPress={true}
				onPanDrag={handleMapDrag}
				initialRegion={initialRegion}
			>
				{/* <SelectedRegionHighlight region={region} /> */}
				{eventData?.map((event) => (
					<EventMapMarker
						key={`${event.event.location?.latitude}-${event.event.location?.longitude}-${event.event.event_uid}`}
						event={event}
						onPress={() => handleEventPress(event)}
						isSelected={
							selectedEvent?.event.event_uid === event.event.event_uid
						}
					/>
				))}
			</MapView>
			<BottomSheet
				snapPoints={snapPoints}
				index={-1} // Start closed
				enableDynamicSizing={false}
				handleComponent={null}
				backdropComponent={null}
				enableContentPanningGesture={true}
				enablePanDownToClose={true}
				animatedPosition={animatedPosition}
				{...controlProps}
			>
				<BottomSheetScrollView
					style={{ borderRadius: 25 }}
					showsVerticalScrollIndicator={false}
				>
					<AView
						key={selectedEvent?.event.event_uid}
						entering={FadeIn.duration(500)}
						exiting={FadeOut.duration(500)}
						flex={1}
					>
						{/** Background */}
						<EventMapSheetItemBackground event={selectedEvent} />

						<TouchableOpacity
							disabled={currentIndex === 1}
							onPress={() => {
								if (selectedEvent) {
									handleEventPress(selectedEvent);
								}
							}}
						>
							<EventMapSheetItemHeader
								event={selectedEvent}
								animatedPosition={interpolatedAnimatedPosition}
							/>
						</TouchableOpacity>

						<AView style={animatedMaximizedContainerStyle}>
							<EventMapSheetItemSubHeader event={selectedEvent} />
							<Button
								text='Go to Event'
								onPress={onPressGoToEvent}
								containerProps={{
									margin: 'm',
									marginBottom: 'xl'
								}}
							/>
							<OrganizerSection
								event={selectedEvent}
								onPress={onPressOrganizer}
							/>
						</AView>
					</AView>
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
	);
};

export default EventMap;
