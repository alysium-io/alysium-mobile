import { AddressComponent } from '@flux/api/location/types';
import _ from 'lodash';
import { Linking } from 'react-native';

interface IUseLocation {
	getAddressComponent: (
		addressComponents: AddressComponent[],
		type: string
	) => AddressComponent | null;
	openMap: (latitude: number, longitude: number, label?: string) => void;
}

const useLocation = (): IUseLocation => {
	// Example input
	// [
	//     {"long_name": "13603", "short_name": "13603", "types": ["street_number"]},
	//     {"long_name": "Marina Pointe Drive", "short_name": "Marina Pointe Dr", "types": ["route"]},
	//     {"long_name": "Venice", "short_name": "Venice", "types": ["neighborhood", "political"]},
	//     {"long_name": "Marina del Rey", "short_name": "Marina Del Rey", "types": ["locality", "political"]},
	//     {"long_name": "Los Angeles County", "short_name": "Los Angeles County", "types": ["administrative_area_level_2", "political"]},
	//     {"long_name": "California", "short_name": "CA", "types": ["administrative_area_level_1", "political"]},
	//     {"long_name": "United States", "short_name": "US", "types": ["country", "political"]},
	//     {"long_name": "90292", "short_name": "90292", "types": ["postal_code"]}
	// ]
	const getAddressComponent = (
		addressComponents: AddressComponent[],
		type: string
	): AddressComponent | null => {
		return (
			_.find(addressComponents, (addressComponent) => {
				return _.includes(addressComponent.types, type);
			}) || null
		);
	};

	const openMap = (latitude: number, longitude: number, label?: string) => {
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
		openMap
	};
};

export default useLocation;
