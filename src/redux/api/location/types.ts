export type Polygon = {
	type: 'Polygon';
	coordinates: number[][][];
};

export type Viewport = {
	northeast: { lat: number; lng: number };
	southwest: { lat: number; lng: number };
};

export type AddressComponent = {
	long_name: string;
	short_name: string;
	types: string[];
};

export interface GoogleMapsAutocompleteResult {
	readonly place_id: string;
	readonly description: string;
	readonly main_text: string;
	readonly secondary_text: string;
}
