import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateStandardFeedbackBodyDto,
	CreateStandardFeedbackResponseDto
} from './dto/standard-feedback-create.dto';

const url = rtkBaseUrl('feedback');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createStandardFeedback: builder.mutation<
			CreateStandardFeedbackResponseDto,
			{ body: CreateStandardFeedbackBodyDto }
		>({
			query: ({ body }) => ({
				url: url('standard'),
				method: 'POST',
				body
			})
		})
	})
});

export default apiSlice;
