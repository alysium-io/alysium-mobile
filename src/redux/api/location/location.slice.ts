import { rtkBaseUrl, serviceApi } from '../base';
import {
	AutocompleteAddressBodyDto,
	AutocompleteAddressResponseDto
} from './dto/autocomplete-address.dto';
import {
	AutocompleteSceneBodyDto,
	AutocompleteSceneResponseDto
} from './dto/autocomplete-scene.dto';

const url = rtkBaseUrl('location');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		autocompleteAddress: builder.query<
			AutocompleteAddressResponseDto,
			{ body: AutocompleteAddressBodyDto }
		>({
			query: ({ body }) => ({
				url: url(`/autocomplete-address`),
				method: 'POST',
				body
			})
		}),
		autocompleteScene: builder.query<
			AutocompleteSceneResponseDto,
			{ body: AutocompleteSceneBodyDto }
		>({
			query: ({ body }) => ({
				url: url(`/autocomplete-scene`),
				method: 'POST',
				body
			})
		})
	})
});
