import { GoogleMapsAutocompleteResult } from '../types';

export interface AutocompleteAddressBodyDto {
	searchText: string;
}

export interface AutocompleteAddressResponseDto
	extends Array<GoogleMapsAutocompleteResult> {}
