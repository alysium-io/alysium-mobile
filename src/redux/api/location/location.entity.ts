import { AddressComponent, Polygon, Viewport } from './types';

export interface Location {
	readonly latitude: number;
	readonly longitude: number;
	readonly google_place_id: string | null;
	readonly formatted_address: string | null;
	readonly boundary: Polygon | null;
	readonly address_components: AddressComponent[] | null;
	readonly viewport: Viewport | null;
}
