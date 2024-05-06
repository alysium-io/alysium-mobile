import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from '../utils/baseQueryConfig';
import {
	CreateContractBodyDto,
	CreateContractResponseDto
} from './dto/create-contract.dto';
import { DeleteContractResponseDto } from './dto/delete-contract.dto';
import {
	FindAllContractsQueryDto,
	FindAllContractsResponseDto
} from './dto/find-all-contracts.dto';
import { FindOneContractParamsDto } from './dto/find-one-contract.dto';
import {
	UpdateContractBodyDto,
	UpdateContractParamsDto,
	UpdateContractResponseDto
} from './dto/update-contract.dto';

const apiSlice = createApi({
	baseQuery: baseQueryConfig({ basePath: '/contract' }),
	reducerPath: 'eventArtistContractsApi',
	tagTypes: ['Contract'],
	endpoints: (builder) => ({
		findAll: builder.query<
			FindAllContractsResponseDto[],
			{ query: FindAllContractsQueryDto }
		>({
			query: ({ query }) => ({
				url: '/',
				method: 'GET',
				params: query
			}),
			providesTags: (results) =>
				results
					? [
							...results.map(({ contract_id }) => ({
								type: 'Contract' as const,
								id: contract_id
							})),
							{ type: 'Contract', id: 'LIST' }
						]
					: [{ type: 'Contract', id: 'LIST' }]
		}),
		findOne: builder.query<
			FindAllContractsResponseDto,
			{ params: FindOneContractParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.contract_id}`,
				method: 'GET'
			}),
			providesTags: (result, error, { params }) => [
				{ type: 'Contract', id: params.contract_id }
			]
		}),
		create: builder.mutation<
			CreateContractResponseDto,
			{ body: CreateContractBodyDto }
		>({
			query: ({ body }) => ({
				url: '/',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'Contract', id: 'LIST' }]
		}),
		update: builder.mutation<
			UpdateContractResponseDto,
			{
				params: UpdateContractParamsDto;
				body: UpdateContractBodyDto;
			}
		>({
			query: ({ params, body }) => ({
				url: `/${params.contract_id}`,
				method: 'PUT',
				body
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Contract', id: result.contract_id }] : []
		}),
		delete: builder.mutation<
			DeleteContractResponseDto,
			{ params: UpdateContractParamsDto }
		>({
			query: ({ params }) => ({
				url: `/${params.contract_id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { params }) => [
				{ type: 'Contract', id: params.contract_id }
			]
		})
	})
});

export default apiSlice;
