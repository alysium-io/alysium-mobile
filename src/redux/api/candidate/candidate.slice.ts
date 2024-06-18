import { createApi } from '@reduxjs/toolkit/query/react';
import { eventApiSlice } from '../event';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateCandidateBodyDto,
	CreateCandidateResponseDto
} from './dto/create-candidate.dto';
import {
	DeleteCandidateBodyDto,
	DeleteCandidateResponseDto
} from './dto/delete-candidate.dto';
import {
	FindAllCandidateEventsQueryDto,
	FindAllCandidateEventsResponseDto
} from './dto/find-all-candidate-events.dto';
import {
	FindAllEventCandidatesQueryDto,
	FindAllEventCandidatesResponseDto
} from './dto/find-all-event-candidates.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/candidate' }),
	reducerPath: 'eventArtistCandidatesApi',
	tagTypes: ['EventCandidates', 'CandidateEvents'],
	endpoints: (builder) => ({
		findAllEventCandidates: builder.query<
			FindAllEventCandidatesResponseDto[],
			{ query: FindAllEventCandidatesQueryDto }
		>({
			query: ({ query }) => ({
				url: '/event-candidates',
				method: 'GET',
				params: query
			}),
			providesTags: (result, error, { query }) => [
				{ type: 'EventCandidates', id: 'LIST' },
				{ type: 'EventCandidates', id: query.event_uid }
			]
		}),
		findAllCandidateEvents: builder.query<
			FindAllCandidateEventsResponseDto[],
			{ query: FindAllCandidateEventsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/candidate-events',
				method: 'GET',
				params: query
			}),
			providesTags: (result, error, { query }) => [
				{ type: 'CandidateEvents', id: 'LIST' },
				{ type: 'CandidateEvents', id: query.artist_uid }
			]
		}),
		createCandidate: builder.mutation<
			CreateCandidateResponseDto,
			{ body: CreateCandidateBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { body }) => [
				{ type: 'CandidateEvents', id: 'LIST' },
				{ type: 'CandidateEvents', id: body.artist_uid },
				{ type: 'EventCandidates', id: body.event_uid }
			],
			onQueryStarted: async ({ body }, { dispatch, queryFulfilled }) => {
				const result = await queryFulfilled;
				dispatch(
					eventApiSlice.util.invalidateTags([
						{ type: 'Event', id: body.event_uid }
					])
				);
				dispatch(
					apiSlice.util.updateQueryData(
						'findAllEventCandidates',
						{ query: { page: 1, limit: 10, event_uid: body.event_uid } },
						(draft) => {
							draft.push(result.data);
						}
					)
				);
			}
		}),
		deleteCandidate: builder.mutation<
			DeleteCandidateResponseDto,
			{ body: DeleteCandidateBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'DELETE',
				body
			}),
			onQueryStarted: async ({ body }, { queryFulfilled, dispatch }) => {
				let patchResult;
				try {
					patchResult = dispatch(
						apiSlice.util.updateQueryData(
							'findAllEventCandidates',
							{ query: { page: 1, limit: 10, event_uid: body.event_uid } },
							(draft) => {
								const index = draft.findIndex(
									(candidate) => candidate.artist.artist_uid === body.artist_uid
								);
								if (index !== -1) {
									draft.splice(index, 1);
								}
							}
						)
					);

					await queryFulfilled;

					// num_candidates update
					dispatch(
						eventApiSlice.util.invalidateTags([
							{ type: 'Event', id: body.event_uid }
						])
					);
				} catch (error) {
					if (patchResult) {
						patchResult.undo();
					}
					console.error('Error fulfilling query:', error);
				}
			}
		})
	})
});

export default apiSlice;
