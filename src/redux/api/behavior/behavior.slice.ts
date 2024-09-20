import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateBehaviorBodyDto,
	CreateBehaviorResponseDto
} from './dto/behavior-create.dto';

const url = rtkBaseUrl('behavior');

const apiSlice = serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createBehavior: builder.mutation<
			CreateBehaviorResponseDto,
			{ body: CreateBehaviorBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/'),
				method: 'POST',
				body
			})
		})
	})
});

export default apiSlice;
