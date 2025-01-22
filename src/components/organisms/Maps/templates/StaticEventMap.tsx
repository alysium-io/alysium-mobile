import { View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { Location } from '@flux/api/location';
import { ImageMarker, MapView, useMap } from '@organisms';
import { Props } from '@types';
import React, { useEffect } from 'react';
import { Region } from 'react-native-maps';

interface StaticEventMapProps extends Props<typeof MapView> {
	events: EventLink[];
}

const StaticEventMap: React.FC<StaticEventMapProps> = ({
	events,
	...props
}) => {
	const { mapRef, animateToRegion, getRegionForLocations } = useMap();

	const getValidLocations = (): Location[] => {
		const data = [];
		for (const event of events) {
			if (event.event.location) {
				data.push(event.event.location);
			}
		}
		return data;
	};

	const getRegion = (): Region | undefined =>
		getRegionForLocations(getValidLocations());

	useEffect(() => {
		const region = getRegion();
		if (region) {
			animateToRegion(region);
		}
	}, [events]);

	return (
		<View
			margin='m'
			style={{ height: 400, overflow: 'hidden', borderRadius: 25 }}
		>
			<MapView
				ref={mapRef}
				initialRegion={getRegion()}
				style={{ height: '110%' }}
				disable
				{...props}
			>
				{events.map(
					(event) =>
						event.event.location && (
							<ImageMarker
								key={event.event.event_uid}
								location={event.event.location}
								image={event.event.profile_image?.small.key}
							/>
						)
				)}
			</MapView>
		</View>
	);
};

export default StaticEventMap;
