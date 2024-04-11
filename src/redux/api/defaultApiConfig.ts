import { RootState } from '@redux';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { env } from 'src/etc';

const config: FetchBaseQueryArgs = {
	baseUrl: env.apiUrl,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	},
	prepareHeaders: (headers, { getState }) => {
		const state = getState() as RootState;
		const token = state.auth.token;
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	}
};

export default config;
