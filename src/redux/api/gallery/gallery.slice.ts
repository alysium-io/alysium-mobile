import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateGalleryBodyDto,
	CreateGalleryResponseDto
} from './dto/gallery-create.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/gallery' }),
	reducerPath: 'galleryApi',
	tagTypes: ['Gallery'],
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateGalleryResponseDto,
			{ body: CreateGalleryBodyDto }
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
