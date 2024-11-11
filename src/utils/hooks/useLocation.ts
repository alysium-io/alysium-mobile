import { Location } from '@flux/api/location';
import { AddressComponent, Polygon, Viewport } from '@flux/api/location/types';
import { Linking } from 'react-native';

/**
 * Available address component types from Google Places API:
 *
 * street_number: The numeric value of the address
 *   Examples: "123", "5", "1007"
 *
 * route: The street name
 *   Examples: "Marina Pointe Drive", "Broadway", "5th Avenue"
 *
 * neighborhood: Named neighborhood area
 *   Examples: "Venice", "Greenwich Village", "Haight-Ashbury"
 *
 * locality: City or town
 *   Examples: "Marina del Rey", "New York", "San Francisco"
 *
 * administrative_area_level_2: County or district
 *   Examples: "Los Angeles County", "King County", "Miami-Dade County"
 *
 * administrative_area_level_1: State or province
 *   Examples: "California", "New York", "Texas"
 *
 * country: Country name
 *   Examples: "United States", "Canada", "United Kingdom"
 *
 * postal_code: ZIP or postal code
 *   Examples: "90292", "10001", "V6B 3K9"
 *
 * political: Indicates a political entity
 *   Note: This is usually combined with other types like locality or country
 *   Examples: Places with distinct political boundaries
 *
 * Usage examples:
 * location.build('locality')                     // "Marina del Rey"
 * location.build('administrative_area_level_1')  // "California"
 * location.build([
 *   { type: 'street_number', delimiter: ' ' },
 *   { type: 'route' }
 * ])                                            // "13603 Marina Pointe Drive"
 */

type AddressComponentType =
	| 'street_number'
	| 'route'
	| 'neighborhood'
	| 'locality'
	| 'administrative_area_level_2'
	| 'administrative_area_level_1'
	| 'country'
	| 'postal_code'
	| 'political';

interface FormatSpecification {
	type: AddressComponentType;
	coalesce?: string;
	nameLength?: 'long_name' | 'short_name';
	delimiter?: string;
}

interface LocationApi {
	getAddressComponent: (type: AddressComponentType) => AddressComponent | null;
	getFormattedAddress: () => string | null;
	getLatLng: () => { latitude: number; longitude: number } | null;
	getPlaceId: () => string | null;
	getViewport: () => Viewport | null;
	getBoundary: () => Polygon | null;
	build: {
		(formatSpecs: FormatSpecification[]): string;
		(formatSpec: FormatSpecification): string;
		(type: AddressComponentType): string;
	};
	openMap: (label?: string) => void;
	hasLocation: boolean;
	raw: Location | null | undefined;
}

export const useLocation = (
	location: Location | null | undefined
): LocationApi => {
	const getAddressComponent = (
		type: AddressComponentType
	): AddressComponent | null => {
		if (!location?.address_components) return null;
		return (
			location.address_components.find((comp) => comp.types.includes(type)) ||
			null
		);
	};

	const getFormattedAddress = (): string | null => {
		return location?.formatted_address || null;
	};

	const getLatLng = () => {
		if (!location) return null;
		return {
			latitude: location.latitude,
			longitude: location.longitude
		};
	};

	const getPlaceId = (): string | null => {
		return location?.google_place_id || null;
	};

	const getViewport = (): Viewport | null => {
		return location?.viewport || null;
	};

	const getBoundary = (): Polygon | null => {
		return location?.boundary || null;
	};

	const buildAddress = (specs: FormatSpecification[]): string => {
		if (!location?.address_components) return '';
		return specs
			.map((spec, index) => {
				const component = getAddressComponent(spec.type);
				if (!component) {
					return spec.coalesce || '';
				}
				const nameLength = spec.nameLength || 'long_name';
				const value = component[nameLength];
				const delimiter =
					index < specs.length - 1 ? spec.delimiter || ', ' : '';
				return value + delimiter;
			})
			.join('')
			.trim();
	};

	const build = ((
		param: FormatSpecification[] | FormatSpecification | AddressComponentType
	): string => {
		if (typeof param === 'string') {
			// Handle single type string
			return buildAddress([{ type: param }]);
		} else if (Array.isArray(param)) {
			// Handle array of specifications
			return buildAddress(param);
		} else {
			// Handle single specification object
			return buildAddress([param]);
		}
	}) as LocationApi['build'];

	const openMap = (label?: string) => {
		if (!location) return;
		const { latitude, longitude } = location;
		const url = new URL('maps://');
		url.searchParams.append('ll', `${latitude},${longitude}`);
		url.searchParams.append('dirflg', 'd');
		if (label) {
			url.searchParams.append('q', label);
		}
		const urlString = url.toString();
		Linking.canOpenURL(urlString).then((supported) => {
			if (supported) {
				Linking.openURL(urlString);
			} else {
				// Fallback to Google Maps web URL
				const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
				Linking.openURL(googleMapsUrl);
			}
		});
	};

	return {
		getAddressComponent,
		getFormattedAddress,
		getLatLng,
		getPlaceId,
		getViewport,
		getBoundary,
		build,
		openMap,
		hasLocation: !!location,
		raw: location
	};
};

export default useLocation;
