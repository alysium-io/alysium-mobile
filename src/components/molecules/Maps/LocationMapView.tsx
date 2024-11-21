import { Location } from '@flux/api/location';
import { useLocationPermissions } from '@hooks';
import { Props } from '@types';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import DefaultMapView from './components/DefaultMapView';

export interface MarkerConfig {
	location?: Location | null;
	label?: string;
	color?: string;
}

interface LocationMapProps {
	markers: MarkerConfig | MarkerConfig[];
	zoomDelta?: number;
	showUserLocation?: boolean;
	mapViewProps?: Props<typeof DefaultMapView>;
}

const DEFAULT_ZOOM_DELTA = 0.005;
const DEFAULT_MARKER_COLOR = 'blue';

const LocationMapView: React.FC<LocationMapProps> = ({
	markers,
	zoomDelta = DEFAULT_ZOOM_DELTA,
	mapViewProps
}) => {
	const mapRef = useRef<MapView>(null);
	const { hasPermission, requestPermission } = useLocationPermissions();

	// Request location permissions when needed
	useEffect(() => {
		if (mapViewProps?.showsUserLocation && !hasPermission) {
			requestPermission();
		}
	}, [mapViewProps?.showsUserLocation, hasPermission]);

	const markersArray = Array.isArray(markers) ? markers : [markers];
	const validMarkers = markersArray.filter(
		(marker): marker is MarkerConfig & { location: Location } =>
			marker.location != null
	);

	// Calculate region based on all markers
	const getRegion = (): Region => {
		// If we only have one marker, use its viewport or location
		if (validMarkers.length === 1) {
			const location = validMarkers[0].location;
			if (location.viewport) {
				const { northeast, southwest } = location.viewport;
				const centerLat = (northeast.lat + southwest.lat) / 2;
				const centerLng = (northeast.lng + southwest.lng) / 2;
				const latDelta = Math.abs(northeast.lat - southwest.lat);
				const lngDelta = Math.abs(northeast.lng - southwest.lng);
				const finalDelta = Math.max(latDelta, lngDelta, zoomDelta);

				return {
					latitude: centerLat,
					longitude: centerLng,
					latitudeDelta: finalDelta,
					longitudeDelta: finalDelta
				};
			}

			return {
				latitude: Number(location.latitude),
				longitude: Number(location.longitude),
				latitudeDelta: zoomDelta,
				longitudeDelta: zoomDelta
			};
		}

		// For multiple markers, calculate the bounding box
		const lats = validMarkers.map((m) => Number(m.location.latitude));
		const lngs = validMarkers.map((m) => Number(m.location.longitude));

		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);
		const minLng = Math.min(...lngs);
		const maxLng = Math.max(...lngs);

		const centerLat = (minLat + maxLat) / 2;
		const centerLng = (minLng + maxLng) / 2;

		// Add padding to the calculated delta
		const latDelta = Math.max((maxLat - minLat) * 1.5, zoomDelta);
		const lngDelta = Math.max((maxLng - minLng) * 1.5, zoomDelta);

		return {
			latitude: centerLat,
			longitude: centerLng,
			latitudeDelta: latDelta,
			longitudeDelta: lngDelta
		};
	};

	// Update map region when markers change
	useEffect(() => {
		const region = getRegion();
		mapRef.current?.animateToRegion(region, 500);
	}, [validMarkers]);

	// Don't render the map if there are no valid markers
	if (validMarkers.length === 0) {
		return null;
	}

	return (
		<DefaultMapView
			ref={mapRef}
			initialRegion={getRegion()}
			{...mapViewProps}
			showsUserLocation={mapViewProps?.showsUserLocation && hasPermission}
		>
			{validMarkers.map((markerConfig, index) => (
				<Marker
					key={`${markerConfig.location.latitude}-${markerConfig.location.longitude}-${index}`}
					coordinate={{
						latitude: Number(markerConfig.location.latitude),
						longitude: Number(markerConfig.location.longitude)
					}}
					title={
						markerConfig.label ??
						markerConfig.location.formatted_address ??
						undefined
					}
					pinColor={markerConfig.color ?? DEFAULT_MARKER_COLOR}
				/>
			))}
		</DefaultMapView>
	);
};

export default LocationMapView;
