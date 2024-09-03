import { PublicArtist } from '../artist.entity';

export interface PublicFindRelatedArtistsParamsDto {
	artist_uid: string;
}

export interface PublicFindRelatedArtistsResponseDto
	extends Array<PublicArtist> {}
