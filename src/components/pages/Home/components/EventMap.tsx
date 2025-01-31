import { View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useBottomSheetControl, useMap, useMapRegionDetection } from '@hooks';
import { ImageMarker, MapView, SelectedEventMapSheet } from '@organisms';
import React, { useEffect, useState } from 'react';
import { Region } from 'react-native-maps';
import TotalEvents from './TotalEvents';

interface EventMapProps {
	initialRegion: Region;
}

const EventMap: React.FC<EventMapProps> = ({ initialRegion }) => {
	const bottomSheetControlApi = useBottomSheetControl();
	const { region, onRegionChangeComplete } =
		useMapRegionDetection(initialRegion);
	const [selectedEvent, setSelectedEvent] = useState<EventLink | null>(null);
	const { mapRef, animateToMarker, animateToRegion } = useMap();
	const { data: eventData, isFetching } = eventApiSlice.useNearbyEventsQuery({
		query: {
			latitude: region?.latitude,
			longitude: region?.longitude,
			radius: region?.radius
		}
	});

	const onMapDrag = () => {
		if (bottomSheetControlApi.currentIndex === 1) {
			bottomSheetControlApi.snap(0);
		}
	};

	const onPressEventMarker = (event: EventLink) => {
		if (event.event.location && mapRef.current) {
			animateToMarker(event.event.location);
		}

		setSelectedEvent(event);
		bottomSheetControlApi.snap(1);
	};

	useEffect(() => {
		animateToRegion(initialRegion);
	}, [initialRegion]);

	return (
		<>
			<View flex={1}>
				<MapView
					ref={mapRef}
					style={{ flex: 1 }}
					onRegionChangeComplete={onRegionChangeComplete}
					showsUserLocation={true}
					moveOnMarkerPress={true}
					onPanDrag={onMapDrag}
					initialRegion={initialRegion}
				>
					{eventData?.map(
						(event) =>
							event.event.location && (
								<ImageMarker
									key={`${event.event.location?.latitude}-${event.event.location?.longitude}-${event.event.event_uid}`}
									image={event.event.profile_image?.small.key}
									location={event.event.location}
									onPress={() => onPressEventMarker(event)}
									isSelected={
										selectedEvent?.event.event_uid === event.event.event_uid
									}
								/>
							)
					)}
				</MapView>
				<SelectedEventMapSheet
					event={selectedEvent}
					bottomSheetControlApi={bottomSheetControlApi}
					onPressMinimizedHeader={onPressEventMarker}
				/>
			</View>
			<TotalEvents
				isFetching={isFetching}
				numberOfEvents={eventData?.length || 0}
			/>
		</>
	);
};

export default EventMap;
