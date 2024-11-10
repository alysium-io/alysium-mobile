import { rtkBaseUrl, serviceApi } from '../base';
import {
	CreateArtistEventBodyDto,
	CreateArtistEventParamsDto,
	CreateArtistEventResponseDto
} from './dto/artist-event-create.dto';
import {
	DeleteArtistEventParamsDto,
	DeleteArtistEventResponseDto
} from './dto/artist-event-delete.dto';
import {
	FindAllArtistEventsParamsDto,
	FindAllArtistEventsResponseDto
} from './dto/artist-event-find-all.dto';
import {
	FindOneArtistEventParamsDto,
	FindOneArtistEventResponseDto
} from './dto/artist-event-find-one.dto';
import {
	UpdateArtistEventBodyDto,
	UpdateArtistEventParamsDto,
	UpdateArtistEventResponseDto
} from './dto/artist-event-update.dto';
import {
	UpdateArtistEventLocationBodyDto,
	UpdateArtistEventLocationParamsDto,
	UpdateArtistEventLocationResponseDto
} from './dto/update-artist-event-location.dto';

const url = rtkBaseUrl('event/artist');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		privateFindOneArtistEvent: builder.query<
			FindOneArtistEventResponseDto,
			{ params: FindOneArtistEventParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.artist_uid}/${params.event_uid}`),
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid }
			]
		}),
		privateFindAllArtistEvents: builder.query<
			FindAllArtistEventsResponseDto,
			{ params: FindAllArtistEventsParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.artist_uid}`),
				method: 'GET'
			}),
			providesTags: (results) =>
				results ? [{ type: 'ArtistEvent', id: 'LIST' }] : []
		}),
		createArtistEvent: builder.mutation<
			CreateArtistEventResponseDto,
			{ params: CreateArtistEventParamsDto; body: CreateArtistEventBodyDto }
		>({
			query: ({ params, body }) => ({
				url: url(`/${params.artist_uid}`),
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'ArtistEvent', id: 'LIST' }]
		}),
		deleteArtistEvent: builder.mutation<
			DeleteArtistEventResponseDto,
			{ params: DeleteArtistEventParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.artist_uid}/${params.event_uid}`),
				method: 'DELETE'
			}),
			invalidatesTags: () => [{ type: 'ArtistEvent', id: 'LIST' }]
		}),
		updateArtistEvent: builder.mutation<
			UpdateArtistEventResponseDto,
			{
				params: UpdateArtistEventParamsDto;
				body: Partial<UpdateArtistEventBodyDto>;
			}
		>({
			query: ({ params, body }) => ({
				url: url(`/${params.artist_uid}/${params.event_uid}`),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid },
				{ type: 'ArtistEvent', id: 'LIST' }
			]
		}),
		updateArtistEventLocation: builder.mutation<
			UpdateArtistEventLocationResponseDto,
			{
				params: UpdateArtistEventLocationParamsDto;
				body: UpdateArtistEventLocationBodyDto;
			}
		>({
			query: ({ params, body }) => ({
				url: url(`/${params.artist_uid}/${params.event_uid}/location`),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'ArtistEvent', id: params.event_uid }
			]
		})
	})
});
