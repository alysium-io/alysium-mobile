import { TargetRegion } from '@hooks';
import React from 'react';
import { Circle, Marker } from 'react-native-maps';

// This component is largely used for debugging purposes, to show the user the region
// that you are currently viewing, with a highlighted area showing the radius.
// You do need to use this in conjunction with the useMapRegionDetection hook in order
// to get its inputs (region & radius).
const SelectedRegionHighlight: React.FC<{
	region: TargetRegion | null;
}> = ({ region }) =>
	region ? (
		<>
			<Circle
				center={{
					latitude: region.latitude,
					longitude: region.longitude
				}}
				radius={region.radius}
				fillColor='rgba(100, 100, 255, 0.2)'
				strokeColor='rgba(100, 100, 255, 0.5)'
				strokeWidth={2}
			/>
			<Marker
				coordinate={{
					latitude: region.latitude,
					longitude: region.longitude
				}}
			/>
		</>
	) : null;

export default SelectedRegionHighlight;
