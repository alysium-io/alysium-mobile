import { env, pathJoin } from '@etc';
import { RootState } from '@flux';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serviceApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: env.env?.apiUrl,
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
	}),
	reducerPath: 'serviceApi',
	tagTypes: [
		'User',
		'UserArtistsFollowing',
		'UserTagsFollowing',
		'Tag',
		'Search',
		'ProfileImage',
		'Artist',
		'PrivateArtist',
		'PublicArtist',
		'ArtistTagLink',
		'ArtistGallery',
		'ArtistEventGallery',
		'ArtistEvent',
		'PublicEvent',
		'UserScenesFollowing',
		'Scene',
		'UserArtistLink'
	],
	endpoints: () => ({})
});

export const rtkBaseUrl = (baseUrl: string) => {
	return (url: string) => pathJoin(baseUrl, url);
};
