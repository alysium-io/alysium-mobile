import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	FindOneLocationParamsDto,
	FindOneLocationResponseDto
} from './dto/location-find-one.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/location' }),
	reducerPath: 'locationApi',
	tagTypes: ['Location'],
	endpoints: (builder) => ({
		findOne: builder.query<
			FindOneLocationResponseDto,
			{ params: FindOneLocationParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.location_uid}`,
				method: 'GET'
			})
		})
	})
});

export default apiSlice;
