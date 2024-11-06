import { rtkBaseUrl, serviceApi } from '../base';
import {
	ArtistJoinSceneBodyDto,
	ArtistJoinSceneResponseDto
} from './dto/artist-join-scene.dto';
import {
	FindOneSceneParamsDto,
	FindOneSceneResponseDto
} from './dto/find-one-scene.dto';

const url = rtkBaseUrl('scene');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		findOneScene: builder.query<
			FindOneSceneResponseDto,
			{ params: FindOneSceneParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.place_id}`),
				method: 'GET'
			})
		}),
		artistJoinScene: builder.mutation<
			ArtistJoinSceneResponseDto,
			{ body: ArtistJoinSceneBodyDto }
		>({
			query: ({ body }) => ({
				url: url('/artist'),
				method: 'POST',
				body
			}),
			invalidatesTags: (results, error, { body }) => [
				{ type: 'PrivateArtist', id: 'CURRENT' }
			]
		})
	})
});
