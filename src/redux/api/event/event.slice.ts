import { rtkBaseUrl, serviceApi } from '../base';
import {
	FindOneEventParamsDto,
	FindOneEventResponseDto
} from './dto/event-find-one.dto';
import {
	NearbyEventsQueryDto,
	NearbyEventsResponseDto
} from './dto/event-nearby.dto';

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
				{ type: 'PublicEvent', id: params.event_uid }
			]
		}),
		nearbyEvents: builder.query<
			NearbyEventsResponseDto,
			{ query: NearbyEventsQueryDto }
		>({
			query: ({ query }) => ({
				url: url('/nearby'),
				method: 'GET',
				params: query
			})
		})
	})
});
