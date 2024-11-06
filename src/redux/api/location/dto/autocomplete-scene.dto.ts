import { GoogleMapsAutocompleteResult } from '../types';

export interface AutocompleteSceneBodyDto {
	searchText: string;
}

export interface AutocompleteSceneResponseDto
	extends Array<GoogleMapsAutocompleteResult> {}
