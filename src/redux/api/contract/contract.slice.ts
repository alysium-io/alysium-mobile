import { createApi } from '@reduxjs/toolkit/query/react';
import { eventApiSlice } from '../event';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateContractBodyDto,
	CreateContractResponseDto
} from './dto/create-contract.dto';
import { DeleteContractResponseDto } from './dto/delete-contract.dto';
import {
	FindAllArtistContractsQueryDto,
	FindAllArtistContractsResponseDto
} from './dto/find-all-artist-contracts.dto';
import {
	FindAllHostContractsQueryDto,
	FindAllHostContractsResponseDto
} from './dto/find-all-host-contracts.dto';
import {
	FindOneContractParamsDto,
	FindOneContractResponseDto
} from './dto/find-one-contract.dto';
import {
	UpdateContractBodyDto,
	UpdateContractParamsDto,
	UpdateContractResponseDto
} from './dto/update-contract.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/contract' }),
	reducerPath: 'contractApi',
	tagTypes: ['HostContract', 'ArtistContract'],
	endpoints: (builder) => ({
		findAllHostContracts: builder.query<
			FindAllHostContractsResponseDto[],
			{ query: FindAllHostContractsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/host',
				method: 'GET',
				params: query
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ contract_uid }) => ({
								type: 'HostContract' as const,
								id: contract_uid
							})),
							{ type: 'HostContract', id: 'LIST' }
						]
					: [{ type: 'HostContract', id: 'LIST' }]
		}),
		findAllArtistContracts: builder.query<
			FindAllArtistContractsResponseDto[],
			{ query: FindAllArtistContractsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/artist',
				method: 'GET',
				params: query
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ contract_uid }) => ({
								type: 'ArtistContract' as const,
								id: contract_uid
							})),
							{ type: 'ArtistContract', id: 'LIST' }
						]
					: [{ type: 'ArtistContract', id: 'LIST' }]
		}),
		findOne: builder.query<
			FindOneContractResponseDto,
			{ params: FindOneContractParamsDto }
		>({
			query: ({ params }) => ({
				url: `/host/${params.contract_uid}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'HostContract', id: params.contract_uid }
			]
		}),
		create: builder.mutation<
			CreateContractResponseDto,
			{ body: CreateContractBodyDto }
		>({
			query: ({ body }) => ({
				url: '/host',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'HostContract', id: 'LIST' }],
			onQueryStarted: async ({ body }, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(
					eventApiSlice.util.invalidateTags([
						{ type: 'Event', id: body.event_uid }
					])
				);
			}
		}),
		update: builder.mutation<
			UpdateContractResponseDto,
			{
				params: UpdateContractParamsDto;
				body: UpdateContractBodyDto;
			}
		>({
			query: ({ params, body }) => ({
				url: `/host/${params.contract_uid}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'HostContract', id: result.contract_uid }] : []
		}),
		delete: builder.mutation<
			DeleteContractResponseDto,
			{ params: UpdateContractParamsDto }
		>({
			query: ({ params }) => ({
				url: `/host/${params.contract_uid}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'HostContract', id: params.contract_uid }
			]
		})
	})
});

export default apiSlice;
