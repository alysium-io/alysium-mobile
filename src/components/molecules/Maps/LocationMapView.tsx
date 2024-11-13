import { Location } from '@flux/api/location';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Circle, Marker, Region } from 'react-native-maps';

interface LocationMapProps {
	location: Location;
	zoomDelta?: number;
	boundaryViewportRatio?: number;
}

const LocationMapView: React.FC<LocationMapProps> = ({
	location,
	zoomDelta,
	boundaryViewportRatio = 0.3
}) => {
	const mapRef = useRef<MapView>(null);

	// Calculate the maximum radius from polygon coordinates if boundary exists
	const calculateMaxRadiusFromBoundary = () => {
		if (!location.boundary?.coordinates?.[0]) {
			return 0;
		}

		const boundaryPoints = location.boundary.coordinates[0];
		const centerPoint = {
			latitude: Number(location.latitude),
			longitude: Number(location.longitude)
		};

		// Calculate the distance from center to each boundary point
		const distancesToBoundary = boundaryPoints.map((boundaryPoint) => {
			const boundaryLatitude = boundaryPoint[1];
			const boundaryLongitude = boundaryPoint[0];

			// Haversine formula implementation to calculate distance in meters
			const earthRadiusInMeters = 6371e3;

			// Convert latitudes to radians
			const centerLatitudeRadians = (centerPoint.latitude * Math.PI) / 180;
			const boundaryLatitudeRadians = (boundaryLatitude * Math.PI) / 180;

			// Calculate differences in coordinates (in radians)
			const latitudeDifferenceRadians =
				((boundaryLatitude - centerPoint.latitude) * Math.PI) / 180;
			const longitudeDifferenceRadians =
				((boundaryLongitude - centerPoint.longitude) * Math.PI) / 180;

			// Calculate intermediate values for Haversine formula
			const haversineTermA =
				Math.sin(latitudeDifferenceRadians / 2) *
					Math.sin(latitudeDifferenceRadians / 2) +
				Math.cos(centerLatitudeRadians) *
					Math.cos(boundaryLatitudeRadians) *
					Math.sin(longitudeDifferenceRadians / 2) *
					Math.sin(longitudeDifferenceRadians / 2);

			const haversineTermC =
				2 *
				Math.atan2(Math.sqrt(haversineTermA), Math.sqrt(1 - haversineTermA));

			// Calculate final distance
			return earthRadiusInMeters * haversineTermC;
		});

		// Return the maximum radius instead of average
		return Math.max(...distancesToBoundary);
	};

	// Calculate appropriate zoom delta based on boundary radius and screen size
	const calculateDynamicZoomDelta = () => {
		const radius = calculateMaxRadiusFromBoundary();
		if (radius === 0) return 0.005; // fallback to default zoom

		// Get screen dimensions
		const { width, height } = Dimensions.get('window');
		const screenSmallestDimension = Math.min(width, height);

		// Convert radius to degrees (approximate)
		// At the equator, 1 degree is approximately 111,320 meters
		const radiusInDegrees = radius / 111320;

		// Calculate zoom delta to make the boundary occupy desired ratio of screen
		// Using a larger multiplier (4.0) to ensure the entire area is visible
		const calculatedDelta = (radiusInDegrees * 4.0) / boundaryViewportRatio;

		// Adjust minimum and maximum bounds for zoom
		const minDelta = 0.01; // Less zoomed in minimum
		const maxDelta = 0.5; // Allow more zoom out for large areas

		return Math.min(Math.max(calculatedDelta, minDelta), maxDelta);
	};

	// Calculate region based on location or viewport
	const getRegion = (): Region => {
		const dynamicZoomDelta = zoomDelta ?? calculateDynamicZoomDelta();

		if (location.viewport) {
			const { northeast, southwest } = location.viewport;
			// Calculate the center
			const centerLat = (northeast.lat + southwest.lat) / 2;
			const centerLng = (northeast.lng + southwest.lng) / 2;

			// Calculate the deltas from the viewport
			const latDelta = Math.abs(northeast.lat - southwest.lat);
			const lngDelta = Math.abs(northeast.lng - southwest.lng);

			// Use the larger of the calculated delta or our dynamic delta
			const finalDelta = Math.max(latDelta, lngDelta, dynamicZoomDelta);

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
			latitudeDelta: dynamicZoomDelta,
			longitudeDelta: dynamicZoomDelta
		};
	};

	// Update map region when location changes
	useEffect(() => {
		const region = getRegion();
		mapRef.current?.animateToRegion(region, 500);
	}, [location.latitude, location.longitude, location.viewport, zoomDelta]);

	const radius = calculateMaxRadiusFromBoundary();

	return (
		<MapView
			ref={mapRef}
			style={styles.map}
			initialRegion={getRegion()}
			zoomEnabled={false}
			scrollEnabled={false}
			rotateEnabled={false}
			pitchEnabled={false}
			zoomTapEnabled={false}
			zoomControlEnabled={false}
			moveOnMarkerPress={false}
			loadingEnabled={true}
			toolbarEnabled={false}
			showsCompass={false}
			showsUserLocation={false}
			showsMyLocationButton={false}
		>
			{radius > 0 && (
				<Circle
					center={{
						latitude: Number(location.latitude),
						longitude: Number(location.longitude)
					}}
					radius={radius}
					strokeWidth={1}
					strokeColor='rgba(0, 0, 0, 0.1)'
					fillColor='rgba(0, 255, 0, 0.1)'
				/>
			)}
			<Marker
				coordinate={{
					latitude: Number(location.latitude),
					longitude: Number(location.longitude)
				}}
				title={location.formatted_address || 'Selected Location'}
			/>
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		width: '100%',
		height: '100%'
	}
});

export default LocationMapView;
