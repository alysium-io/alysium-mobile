import { useTheme } from '@hooks';
import React, { forwardRef } from 'react';
import RNMapView, { MapViewProps } from 'react-native-maps';

const MapView = forwardRef<RNMapView, MapViewProps & { disable?: boolean }>(
	(props, ref) => {
		const { theme } = useTheme();
		const disableProps = props.disable
			? {
					scrollEnabled: false,
					pitchEnabled: false,
					rotateEnabled: false,
					zoomEnabled: false,
					zoomTapEnabled: false,
					moveOnMarkerPress: false,
					showsCompass: false,
					showsMyLocationButton: false,
					zoomControlEnabled: false,
					toolbarEnabled: false,
					scrollDuringRotateOrZoomEnabled: false
			  }
			: {};
		return (
			<RNMapView
				ref={ref}
				loadingEnabled={true}
				userInterfaceStyle={theme.colors['etc.mapview']}
				// Hide all the nonsense
				showsBuildings={false}
				showsTraffic={false}
				showsPointsOfInterest={false}
				showsScale={false}
				showsIndoorLevelPicker={false}
				showsIndoors={false}
				showsCompass={false}
				{...disableProps}
				{...props}
			/>
		);
	}
);

export default MapView;
