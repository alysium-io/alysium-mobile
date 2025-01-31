import { Location } from '@flux/api/location';
import { Viewport } from '@flux/api/location/types';
import { AddressGeometry } from '@types';
import { useRef } from 'react';
import MapView, { Region } from 'react-native-maps';

const DEFAULT_ZOOM_DELTA = 0.15;

interface MapApi {
	mapRef: React.RefObject<MapView>;
	animateToRegion: (region: Region) => void;
	animateToLocation: (location: Location | Location[]) => void;
	animateToMarker: (location: Location) => void;
	getRegionForLocation: (location: Location) => Region;
	getRegionForLocations: (
		locations: Location | Location[]
	) => Region | undefined;
	viewportToRegion: (viewport: Viewport) => Region;
	regionToRadius: (region: Region) => number;
	geometryToRegion: (geometry: AddressGeometry) => Region;
	DEFAULT_ZOOM_DELTA: number;
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

	const geometryToRegion = (geometry: AddressGeometry): Region => {
		const { northeast, southwest } = geometry.viewport;
		const latitudeDelta = northeast.lat - southwest.lat;
		const longitudeDelta = northeast.lng - southwest.lng;
		return {
			latitude: geometry.location.lat,
			longitude: geometry.location.lng,
			latitudeDelta: latitudeDelta,
			longitudeDelta: longitudeDelta
		};
	};

	const viewportToRegion = (viewport: Viewport) => {
		const { northeast, southwest } = viewport;
		const centerLat = (northeast.lat + southwest.lat) / 2;
		const centerLng = (northeast.lng + southwest.lng) / 2;
		const latDelta = Math.abs(northeast.lat - southwest.lat);
		const lngDelta = Math.abs(northeast.lng - southwest.lng);

		return {
			latitude: centerLat,
			longitude: centerLng,
			latitudeDelta: latDelta,
			longitudeDelta: lngDelta
		};
	};

	const getRegionForLocation = (location: Location): Region => {
		if (location.viewport) {
			const { latitude, longitude, latitudeDelta, longitudeDelta } =
				viewportToRegion(location.viewport);

			const finalDelta = Math.max(
				latitudeDelta,
				longitudeDelta,
				DEFAULT_ZOOM_DELTA
			);

			return {
				latitude,
				longitude,
				latitudeDelta: finalDelta,
				longitudeDelta: finalDelta
			};
		}

		return {
			latitude: Number(location.latitude),
			longitude: Number(location.longitude),
			latitudeDelta: DEFAULT_ZOOM_DELTA,
			longitudeDelta: DEFAULT_ZOOM_DELTA
		};
	};

	const getRegionForLocations = (
		locations: Location | Location[]
	): Region | undefined => {
		const locationsArray = Array.isArray(locations) ? locations : [locations];
		if (locationsArray.length === 0) {
			return undefined;
		}

		// Case 1: In the case that there is only one location
		if (locationsArray.length === 1) {
			const location = locationsArray[0];

			// We decided that if we only have 1 event, that we should give a slightly
			// more outward perspective, rather than basing it on the viewport of the building.
			// When you base it on the viewport of the building, it will zoom in on the building
			// and not show the rest of the map, which makes it rather useless. We'll see how
			// this goes, so we will leave the viewport code commented out for now.
			return {
				...getRegionForLocation(location),
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

	const regionToRadius = (region: Region): number => {
		// We calculate the radius based on the approximate vertical delta between
		// the the center of the map and the top of the map. Since phones are
		// rectangular, this will "object-fit" the region vertically, overshooting
		// horizontally a bit. This is fine.
		// The other option is to use the longitude delta, but the object-fit in this
		// case leaves a gap on the top and bottom of the viewable map. So I guess
		// we'd rather overshoot a bit to capture the whole viewable map than leave
		// a gap, but this is definitely still up for debate. I might change this later...
		const delta = region.latitudeDelta;

		const radiusInMeters =
			(delta * 111320 * Math.cos(region.latitude * (Math.PI / 180))) / 2;
		return radiusInMeters;
	};

	return {
		mapRef,
		animateToRegion,
		animateToLocation,
		animateToMarker,
		getRegionForLocation,
		getRegionForLocations,
		viewportToRegion,
		regionToRadius,
		geometryToRegion,
		DEFAULT_ZOOM_DELTA
	};
};

export default useMap;
