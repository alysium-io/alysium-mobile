import { rtkBaseUrl, serviceApi } from '../base';
import {
	GetArtistTeamParamsDto,
	GetArtistTeamResponseDto
} from './dto/get-artist-management.dto';
import {
	GrantArtistAccessBodyDto,
	GrantArtistAccessResponseDto
} from './dto/grant-artist-access.dto';
import {
	RevokeArtistAccessBodyDto,
	RevokeArtistAccessResponseDto
} from './dto/revoke-artist-access.dto';

const url = rtkBaseUrl('user-artist-link');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		getArtistTeam: builder.query<
			GetArtistTeamResponseDto,
			{ params: GetArtistTeamParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/artist/${params.artist_uid}`)
			}),
			providesTags: [{ type: 'UserArtistLink', id: 'LIST' }]
		}),
		grantArtistAccess: builder.mutation<
			GrantArtistAccessResponseDto,
			{ body: GrantArtistAccessBodyDto }
		>({
			query: ({ body }) => ({
				url: url(`/grant-artist-access`),
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'UserArtistLink', id: 'LIST' }]
		}),
		revokeArtistAccess: builder.mutation<
			RevokeArtistAccessResponseDto,
			{ body: RevokeArtistAccessBodyDto }
		>({
			query: ({ body }) => ({
				url: url(`/revoke-artist-access`),
				method: 'DELETE',
				body
			}),
			invalidatesTags: [{ type: 'UserArtistLink', id: 'LIST' }]
		})
	})
});
