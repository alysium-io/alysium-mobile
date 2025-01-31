import { Location } from '@flux/api/location';
import { useMap } from '@hooks';
import { MapView } from '@organisms';
import React, { useEffect } from 'react';

interface LocationParallaxMapDisplayProps {
	location: Location;
}

const LocationParallaxMapDisplay: React.FC<LocationParallaxMapDisplayProps> = ({
	location
}) => {
	const { mapRef, animateToRegion, getRegionForLocation } = useMap();
	const region = getRegionForLocation(location);

	useEffect(() => {
		if (location) {
			animateToRegion(region);
		}
	}, [location]);

	return (
		<MapView ref={mapRef} initialRegion={region} style={{ height: '110%' }} />
	);
};

export default LocationParallaxMapDisplay;
