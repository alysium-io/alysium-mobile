import { GeocodeResult } from '@types';

export type Polygon = {
	type: 'Polygon';
	coordinates: number[][][];
};

export interface GoogleMapsAutocompleteResult {
	readonly place_id: string;
	readonly description: string;
	readonly main_text: string;
	readonly secondary_text: string;
}

export interface GeocodeResponseDto {
	place_id: string;
	cityResult: GeocodeResult;
	polygon: Polygon;
}
