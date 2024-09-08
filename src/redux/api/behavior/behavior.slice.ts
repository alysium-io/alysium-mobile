import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateBehaviorBodyDto,
	CreateBehaviorResponseDto
} from './dto/behavior-create.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/behavior' }),
	reducerPath: 'behaviorApi',
	endpoints: (builder) => ({
		create: builder.mutation<
			CreateBehaviorResponseDto,
			{ body: CreateBehaviorBodyDto }
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
