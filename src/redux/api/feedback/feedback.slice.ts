import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateStandardFeedbackBodyDto,
	CreateStandardFeedbackResponseDto
} from './dto/standard-feedback-create.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/feedback' }),
	reducerPath: 'feedbackApi',
	endpoints: (builder) => ({
		createStandardFeedback: builder.mutation<
			CreateStandardFeedbackResponseDto,
			{ body: CreateStandardFeedbackBodyDto }
		>({
			query: ({ body }) => ({
				url: '/standard',
				method: 'POST',
				body
			})
		})
	})
});

export default apiSlice;
