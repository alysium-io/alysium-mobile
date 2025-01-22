import { View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { Location } from '@flux/api/location';
import { useBottomSheetControl, useMapRegionDetection } from '@hooks';
import {
	BasePage,
	ImageMarker,
	MapView,
	SelectedEventMapSheet,
	useMap
} from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ArtistEventsInteractiveMapPageRouteProp } from '@types';
import React, { useEffect, useState } from 'react';
import ArtistEventsInteractiveMapPageHeader from './ArtistEventsInteractiveMap.header';

const ArtistEventsInteractiveMapPage = () => {
	const { params } = useRoute<ArtistEventsInteractiveMapPageRouteProp>();
	const bottomSheetControlApi = useBottomSheetControl();
	const { onRegionChangeComplete } = useMapRegionDetection();
	const [selectedEvent, setSelectedEvent] = useState<EventLink | null>(null);
	const { mapRef, animateToMarker, animateToRegion, getRegionForLocations } =
		useMap();
	const { data } = artistEventApiSlice.usePublicFindAllArtistEventsQuery({
		params: {
			artist_uid: params.artist_uid
		},
		query: {
			page: 1,
			limit: 50
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

	const getValidLocations = (): Location[] => {
		const locations: Location[] = [];
		data?.forEach((event) => {
			if (event.event.location) {
				locations.push(event.event.location);
			}
		});
		return locations;
	};

	useEffect(() => {
		const region = getRegionForLocations(getValidLocations());
		if (region) {
			animateToRegion(region);
		}
	}, [data]);

	return (
		<BasePage>
			<ArtistEventsInteractiveMapPageHeader
				artist_uid={params.artist_uid}
				numEvents={data?.length ?? 0}
			/>
			<View flex={1}>
				<MapView
					ref={mapRef}
					style={{ flex: 1 }}
					onRegionChangeComplete={onRegionChangeComplete}
					showsUserLocation={true}
					moveOnMarkerPress={true}
					onPanDrag={onMapDrag}
					initialRegion={getRegionForLocations(getValidLocations())}
				>
					{data?.map(
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
		</BasePage>
	);
};

export default ArtistEventsInteractiveMapPage;
