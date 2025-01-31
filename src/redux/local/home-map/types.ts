import { GeocodeResponseDto } from '@flux/api/location/types';
import { Region } from 'react-native-maps';

export type HomeMapState = {
	radius: number;
	defaultRegion: Region;
	region: Region;
	city: GeocodeResponseDto | null;
};
