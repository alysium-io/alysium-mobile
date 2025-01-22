import { rtkBaseUrl, serviceApi } from '../base';
import {
	ArtistJoinSceneBodyDto,
	ArtistJoinSceneResponseDto
} from './dto/artist-join-scene.dto';
import {
	FindOneSceneByPlaceParamsDto,
	FindOneSceneByPlaceResponseDto
} from './dto/find-one-scene-by-place.dto';
import {
	FindOneSceneParamsDto,
	FindOneSceneResponseDto
} from './dto/find-one-scene.dto';
import {
	FindSceneArtistsParamsDto,
	FindSceneArtistsResponseDto
} from './dto/find-scene-artists.dto';

const url = rtkBaseUrl('scene');

export default serviceApi.injectEndpoints({
	endpoints: (builder) => ({
		findOneSceneByPlace: builder.query<
			FindOneSceneByPlaceResponseDto,
			{ params: FindOneSceneByPlaceParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/place/${params.place_id}`),
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
				{ type: 'PrivateArtist', id: 'CURRENT' },
				{ type: 'PublicArtist', id: body.artist_uid }
			]
		}),
		findOneScene: builder.query<
			FindOneSceneResponseDto,
			{ params: FindOneSceneParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.scene_uid}`),
				method: 'GET'
			}),
			providesTags: (result) =>
				result ? [{ type: 'Scene', id: result.scene_uid }] : []
		}),
		findSceneArtists: builder.query<
			FindSceneArtistsResponseDto,
			{ params: FindSceneArtistsParamsDto }
		>({
			query: ({ params }) => ({
				url: url(`/${params.scene_uid}/artists`),
				method: 'GET'
			})
		})
	})
});
