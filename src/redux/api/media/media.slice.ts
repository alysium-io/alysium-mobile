import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateMediaBodyDto,
	CreateMediaResponseDto
} from './dto/media-create.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/media' }),
	reducerPath: 'mediaApi',
	tagTypes: ['Media'],
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateMediaResponseDto,
			{ body: CreateMediaBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			})
		})
	})
});

export default apiSlice;
