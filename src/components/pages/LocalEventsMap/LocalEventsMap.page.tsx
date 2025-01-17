import { MapView, View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useMapRegionDetection, useSheet } from '@hooks';
import { SelectedRegionHighlight } from '@molecules';
import React, { useState } from 'react';
import EventMarker from './components/EventMarker';
import Footer from './components/Footer';
import SelectedEventSheet from './sheets/SelectedEventSheet';

const LocalEventsMap = () => {
	const { region, onRegionChangeComplete } = useMapRegionDetection();
	const [selectedEvent, setSelectedEvent] = useState<EventLink | null>(null);
	const selectedEventSheetApi = useSheet();

	const { data: eventData } = eventApiSlice.useNearbyEventsQuery({
		query: {
			latitude: region?.latitude,
			longitude: region?.longitude,
			radius: region?.radius
		}
	});

	return (
		<View flex={1}>
			<MapView
				style={{ flex: 1 }}
				onRegionChangeComplete={onRegionChangeComplete}
				showsUserLocation={true}
				moveOnMarkerPress={true}
			>
				<SelectedRegionHighlight region={region} />
				{eventData?.map((event) => (
					<EventMarker
						key={`${event.event.location?.latitude}-${event.event.location?.longitude}-${event.event.event_uid}`}
						event={event}
						onSelect={() => {
							console.log('onCalloutPress');
							setSelectedEvent(event);
							selectedEventSheetApi.open();
						}}
					/>
				))}
			</MapView>
			<Footer />
			<SelectedEventSheet sheetApi={selectedEventSheetApi} />
		</View>
	);
};

export default LocalEventsMap;
