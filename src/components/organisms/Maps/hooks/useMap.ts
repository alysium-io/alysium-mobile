import { Location } from '@flux/api/location';
import { useRef } from 'react';
import MapView, { Region } from 'react-native-maps';

interface MapApi {
	mapRef: React.RefObject<MapView>;
	animateToRegion: (region: Region) => void;
	animateToLocation: (location: Location | Location[]) => void;
	animateToMarker: (location: Location) => void;
	getRegionForLocations: (
		locations: Location | Location[]
	) => Region | undefined;
}

const useMap = (): MapApi => {
	const mapRef = useRef<MapView>(null);

	const animateToRegion = (region: Region) => {
		mapRef.current?.animateToRegion(region, 800);
	};

	const animateToLocation = (location: Location | Location[]) => {
		const locations = Array.isArray(location) ? location : [location];
		const region = getRegionForLocations(locations);
		if (region) {
			animateToRegion(region);
		}
	};

	const animateToMarker = (location: Location) => {
		// The purpose of this is to adjust the point that
		// we animate to slightly upwards because we will
		// animated the bottom sheet into view which takes
		// up about 50% of the screen. So we want to actually
		// animate the marker to about 1/4 of the way down
		// from the top of the screen. This is totally an arbitrary
		// estimate and should be revisited with actual math at some point.
		const SCREEN_ADJUSTMENT_DELTA = 0.03;
		animateToRegion({
			latitude: location.latitude - SCREEN_ADJUSTMENT_DELTA,
			longitude: location.longitude,
			latitudeDelta: 0.15,
			longitudeDelta: 0.15
		});
	};

	const getRegionForLocations = (
		locations: Location | Location[]
	): Region | undefined => {
		const locationsArray = Array.isArray(locations) ? locations : [locations];
		if (locationsArray.length === 0) {
			return undefined;
		}

		const DEFAULT_ZOOM_DELTA = 0.15;
		// Case 1: In the case that there is only one location
		if (locationsArray.length === 1) {
			const location = locationsArray[0];

			// We decided that if we only have 1 event, that we should give a slightly
			// more outward perspective, rather than basing it on the viewport of the building.
			// When you base it on the viewport of the building, it will zoom in on the building
			// and not show the rest of the map, which makes it rather useless. We'll see how
			// this goes, so we will leave the viewport code commented out for now.

			// if (location.viewport) {
			// 	const { northeast, southwest } = location.viewport;
			// 	const centerLat = (northeast.lat + southwest.lat) / 2;
			// 	const centerLng = (northeast.lng + southwest.lng) / 2;
			// 	const latDelta = Math.abs(northeast.lat - southwest.lat);
			// 	const lngDelta = Math.abs(northeast.lng - southwest.lng);
			// 	const finalDelta = Math.max(latDelta, lngDelta, DEFAULT_ZOOM_DELTA);

			// 	return {
			// 		latitude: centerLat,
			// 		longitude: centerLng,
			// 		latitudeDelta: finalDelta,
			// 		longitudeDelta: finalDelta
			// 	};
			// }

			return {
				latitude: Number(location.latitude),
				longitude: Number(location.longitude),
				latitudeDelta: DEFAULT_ZOOM_DELTA,
				longitudeDelta: DEFAULT_ZOOM_DELTA
			};
		}

		const lats = locationsArray.map((m) => Number(m.latitude));
		const lngs = locationsArray.map((m) => Number(m.longitude));

		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);
		const minLng = Math.min(...lngs);
		const maxLng = Math.max(...lngs);

		const centerLat = (minLat + maxLat) / 2;
		const centerLng = (minLng + maxLng) / 2;

		const latDelta = Math.max((maxLat - minLat) * 1.5, DEFAULT_ZOOM_DELTA);
		const lngDelta = Math.max((maxLng - minLng) * 1.5, DEFAULT_ZOOM_DELTA);

		return {
			latitude: centerLat,
			longitude: centerLng,
			latitudeDelta: latDelta,
			longitudeDelta: lngDelta
		};
	};

	return {
		mapRef,
		animateToRegion,
		animateToLocation,
		animateToMarker,
		getRegionForLocations
	};
};

export default useMap;
