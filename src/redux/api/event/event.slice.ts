import { rtkBaseUrl, serviceApi } from '../base';
import {
	FindOneEventParamsDto,
	FindOneEventResponseDto
} from './dto/event-find-one.dto';

const url = rtkBaseUrl('event');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		findOneEvent: builder.query<
			FindOneEventResponseDto,
			{ params: FindOneEventParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.event_uid}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid }
			]
		})
	})
});
