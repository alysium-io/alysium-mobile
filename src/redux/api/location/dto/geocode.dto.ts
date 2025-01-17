import { GeocodeResult } from '@types';
import { Polygon } from '../types';

export interface GeocodeResponseDto {
	place_id: string;
	cityResult: GeocodeResult;
	polygon: Polygon;
}
