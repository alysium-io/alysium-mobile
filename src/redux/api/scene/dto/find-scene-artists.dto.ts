import { ArtistSceneLink } from '@flux/api/artist-scene-link/artist-scene-link.entity';
import { NanoId } from '@types';

export interface FindSceneArtistsParamsDto {
	scene_uid: NanoId;
}

export interface FindSceneArtistsResponseDto extends Array<ArtistSceneLink> {}
