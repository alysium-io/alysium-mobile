import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateReportedContentBodyDto,
	CreateReportedContentResponseDto
} from './dto/reported-content-create.dto';

const url = rtkBaseUrl('reported-content');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		createReportedContent: builder.mutation<
			CreateReportedContentResponseDto,
			{ body: CreateReportedContentBodyDto }
		>({
			query: ({ body }) => ({
				url: url(''),
				method: 'POST',
				body
			})
		})
	})
});
