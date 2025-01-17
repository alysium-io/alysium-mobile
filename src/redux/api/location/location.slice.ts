import { rtkBaseUrl, serviceApi } from '../base';
import {
	AutocompleteAddressBodyDto,
	AutocompleteAddressResponseDto
} from './dto/autocomplete-address.dto';
import {
	AutocompleteSceneBodyDto,
	AutocompleteSceneResponseDto
} from './dto/autocomplete-scene.dto';
import {
	FindGoogleLocationDetailsByPlaceIdBodyDto,
	FindGoogleLocationDetailsByPlaceIdResponseDto
} from './dto/find-google-location-details-by-place-id.dto';
import {
	GeocodeLatLngQueryDto,
	GeocodeLatLngResponseDto
} from './dto/geocode-lat-lng.dto';
import {
	GeocodePlaceIdQueryDto,
	GeocodePlaceIdResponseDto
} from './dto/geocode-place.dto';
import {
	DriveTimeQueryDto,
	DriveTimeResponseDto
} from './dto/get-drive-time.dto';

const url = rtkBaseUrl('location');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		autocompleteAddress: builder.query<
			AutocompleteAddressResponseDto,
			{ body: AutocompleteAddressBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/autocomplete-place'),
				method: 'POST',
				body
			})
		}),
		autocompleteScene: builder.query<
			AutocompleteSceneResponseDto,
			{ body: AutocompleteSceneBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/autocomplete-scene'),
				method: 'POST',
				body
			})
		}),
		findGoogleLocationDetailsByPlaceId: builder.query<
			FindGoogleLocationDetailsByPlaceIdResponseDto,
			{ body: FindGoogleLocationDetailsByPlaceIdBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/place'),
				method: 'POST',
				body
			})
		}),
		getDriveTime: builder.query<
			DriveTimeResponseDto,
			{ query: DriveTimeQueryDto }
		>({
			query: ({ query }) => ({
				url: url('/directions'),
				method: 'GET',
				params: query
			})
		}),
		geocodeLatLng: builder.query<
			GeocodeLatLngResponseDto,
			{ query: GeocodeLatLngQueryDto }
		>({
			query: ({ query }) => ({
				url: url('/geocode/lat-lng'),
				method: 'GET',
				params: query
			})
		}),
		geocodePlaceId: builder.query<
			GeocodePlaceIdResponseDto,
			{ query: GeocodePlaceIdQueryDto }
		>({
			query: ({ query }) => ({
				url: url('/geocode/place'),
				method: 'GET',
				params: query
			})
		})
	})
});
