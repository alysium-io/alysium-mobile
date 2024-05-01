import { createApi } from '@reduxjs/toolkit/query/react';
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
	tagTypes: ['Candidates'],
	endpoints: (builder) => ({
		findAllEventCandidates: builder.query<
			FindAllEventCandidatesResponseDto[],
			{ query: FindAllEventCandidatesQueryDto }
		>({
			query: ({ query }) => ({
				url: '/event-candidates',
				method: 'GET',
				params: query
			})
		}),
		findAllCandidateEvents: builder.query<
			FindAllCandidateEventsResponseDto[],
			{ query: FindAllCandidateEventsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/candidate-events',
				method: 'GET',
				params: query
			})
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
			onQueryStarted: async ({ body }, { dispatch, queryFulfilled }) => {
				// const result = await queryFulfilled;
				// dispatch(
				// 	apiSlice.util.updateQueryData(
				// 		'findAllCandidates',
				// 		{ query: { page: 1, limit: 10 } },
				// 		(draft) => {
				// 			draft.push(result.data);
				// 		}
				// 	)
				// );
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
				// try {
				// 	patchResult = dispatch(
				// 		apiSlice.util.updateQueryData(
				// 			'findAllCandidates',
				// 			{ query: { page: 1, limit: 10 } },
				// 			(draft) => {
				// 				const index = draft.findIndex(
				// 					(event_artist_candidate) =>
				// 						event_artist_candidate.event_id === params.event_id
				// 				);
				// 				if (index !== -1) {
				// 					draft.splice(index, 1);
				// 				}
				// 			}
				// 		)
				// 	);

				// 	await queryFulfilled;
				// } catch (error) {
				// 	if (patchResult) {
				// 		patchResult.undo();
				// 	}
				// 	console.error('Error fulfilling query:', error);
				// }
			}
		})
	})
});

export default apiSlice;
