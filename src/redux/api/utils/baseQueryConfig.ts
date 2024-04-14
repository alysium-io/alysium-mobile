import { env } from '@etc';
import { RootState } from '@redux';
import {
	FetchArgs,
	FetchBaseQueryArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type BaseQueryConfig = {
	basePath?: string;
};

const baseQueryConfig = (
	options?: BaseQueryConfig
): BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	{},
	FetchBaseQueryMeta
> => {
	const config: FetchBaseQueryArgs = {
		baseUrl: env.apiUrl + (options?.basePath ?? ''),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState;
			const token = state.persistedApp.token;
			if (token) headers.set('Authorization', `Bearer ${token}`);
			return headers;
		}
	};
	return fetchBaseQuery(config);
};

export default baseQueryConfig;
