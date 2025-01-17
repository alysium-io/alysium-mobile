import { useTheme } from '@hooks';
import React, { forwardRef } from 'react';
import RNMapView, { MapViewProps } from 'react-native-maps';

const MapView = forwardRef<RNMapView, MapViewProps>((props, ref) => {
	const { theme } = useTheme();
	return (
		<RNMapView
			ref={ref}
			loadingEnabled={true}
			showsBuildings={false}
			showsTraffic={false}
			showsPointsOfInterest={false}
			showsScale={false}
			showsIndoorLevelPicker={false}
			showsIndoors={false}
			showsCompass={false}
			userInterfaceStyle={theme.colors['etc.mapview']}
			{...props}
		/>
	);
});

export default MapView;
