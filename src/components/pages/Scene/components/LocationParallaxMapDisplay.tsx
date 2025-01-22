import { Location } from '@flux/api/location';
import { MapView, useMap } from '@organisms';
import React, { useEffect } from 'react';

interface LocationParallaxMapDisplayProps {
	location: Location;
}

const LocationParallaxMapDisplay: React.FC<LocationParallaxMapDisplayProps> = ({
	location
}) => {
	const { mapRef, animateToLocation, getRegionForLocations } = useMap();

	useEffect(() => {
		if (location) {
			animateToLocation(location);
		}
	}, [location]);

	return (
		<MapView
			ref={mapRef}
			initialRegion={getRegionForLocations([location])}
			style={{ height: '110%' }}
		/>
	);
};

export default LocationParallaxMapDisplay;
