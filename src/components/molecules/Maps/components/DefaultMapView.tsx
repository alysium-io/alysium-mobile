import { Props } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

type DefaultMapViewProps = Props<typeof MapView>;

const DefaultMapView = React.forwardRef<MapView, DefaultMapViewProps>(
	(props, ref) => {
		return (
			<MapView
				ref={ref}
				style={styles.map}
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
				showsMyLocationButton={false}
				{...props}
			/>
		);
	}
);

const styles = StyleSheet.create({
	map: {
		width: '100%',
		height: '100%'
	}
});

export default DefaultMapView;
