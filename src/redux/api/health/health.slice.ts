import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/health' }),
	reducerPath: 'healthApi',
	tagTypes: [],
	endpoints: (builder) => ({
		health: builder.query<string, void>({
			query: () => ({
				url: '',
				method: 'GET',
				responseHandler: (response) => response.text()
			})
		})
	})
});

export default apiSlice;
