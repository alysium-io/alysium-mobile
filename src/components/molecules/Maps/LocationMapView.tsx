import { Location } from '@flux/api/location';
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Circle, Marker, Region } from 'react-native-maps';

interface LocationMapProps {
	location: Location;
	zoomDelta?: number;
}

const LocationMapView: React.FC<LocationMapProps> = ({
	location,
	zoomDelta = 0.005
}) => {
	const mapRef = useRef<MapView>(null);

	// Calculate the radius from polygon coordinates if boundary exists
	const calculateAverageRadiusFromBoundary = () => {
		// Check if boundary coordinates exist
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

		// Calculate and return the average radius
		const totalDistance = distancesToBoundary.reduce(
			(sum, distance) => sum + distance,
			0
		);
		return totalDistance / distancesToBoundary.length;
	};

	// Calculate region based on location or viewport
	const getRegion = (): Region => {
		if (location.viewport) {
			const { northeast, southwest } = location.viewport;
			return {
				latitude: (northeast.lat + southwest.lat) / 2,
				longitude: (northeast.lng + southwest.lng) / 2,
				latitudeDelta: zoomDelta,
				longitudeDelta: zoomDelta
			};
		}

		return {
			latitude: Number(location.latitude),
			longitude: Number(location.longitude),
			latitudeDelta: zoomDelta,
			longitudeDelta: zoomDelta
		};
	};

	// Update map region when location changes
	useEffect(() => {
		const region = getRegion();
		mapRef.current?.animateToRegion(region, 500);
	}, [location.latitude, location.longitude, location.viewport]);

	const radius = calculateAverageRadiusFromBoundary();

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
