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

const useMapRegionDetection = (): IMapRegionDetection => {
	/**
	 * The purpose of this hook is to make it very simple to get the center and area
	 * of a map that you're currently viewing. This is helpful for searching geographically
	 * based on the user's current location & what is around them, or simply by retrieving
	 * events that are within a certain radius of a given point.
	 */

	/**
	 * You must set `onRegionChangeComplete` to update the region & radius state.
	 */
	const [region, setRegion] = useState<TargetRegion | null>(null);

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
			radius: getRadiusFromDelta(region)
		});
	};

	// Calculate radius based on deltas (this is approximate)
	const getRadiusFromDelta = (region: Region): number => {
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
		region,
		latitude,
		longitude,
		onRegionChange,
		onRegionChangeComplete
	};
};

export default useMapRegionDetection;
