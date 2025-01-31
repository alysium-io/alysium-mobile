import { useMap } from '@hooks';
import { useState } from 'react';
import { Region } from 'react-native-maps';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

export interface TargetRegion extends Region {
	// In meters
	radius: number;
}

interface IMapRegionDetection {
	region: TargetRegion | null;
	latitude: SharedValue<string>;
	longitude: SharedValue<string>;
	onRegionChange: (region: Region) => void;
	onRegionChangeComplete: (region: Region) => void;
}

const useMapRegionDetection = (
	initialRegion?: Region | null
): IMapRegionDetection => {
	const { regionToRadius } = useMap();

	/**
	 * You must set `onRegionChangeComplete` to update the region & radius state.
	 */
	const [region, setRegion] = useState<TargetRegion | null>(
		initialRegion
			? {
					...initialRegion,
					radius: initialRegion ? regionToRadius(initialRegion) : 0
			  }
			: null
	);

	/**
	 * You must set `onRegionChange` to update the latitude & longitude shared values.
	 */
	const latitude = useSharedValue<string>('0');
	const longitude = useSharedValue<string>('0');

	const onRegionChange = (region: Region) => {
		latitude.value = region.latitude.toFixed(4).toString();
		longitude.value = region.longitude.toFixed(4).toString();
	};

	const onRegionChangeComplete = (region: Region) => {
		setRegion({
			...region,
			radius: regionToRadius(region)
		});
	};

	return {
		region,
		latitude,
		longitude,
		onRegionChange,
		onRegionChangeComplete
	};
};

export default useMapRegionDetection;
