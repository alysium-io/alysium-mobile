import { rtkBaseUrl, serviceApi } from '../base';

const url = rtkBaseUrl('health');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		health: builder.query<string, void>({
			query: () => ({
				url: url('/'),
				method: 'GET',
				responseHandler: (response) => response.text()
			})
		})
	})
});

export default apiSlice;
