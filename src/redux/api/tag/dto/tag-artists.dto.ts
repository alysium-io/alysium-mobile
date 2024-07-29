import { ArtistTagLink } from '@flux/api/artist-tag-link';
import { ApiIdentifier } from '@types';

export interface FindTagArtistsParamsDto {
	tag_uid: ApiIdentifier;
}

export interface FindTagArtistsQueryDto {
	page: number;
	limit: number;
}

export interface FindTagArtistsResponseDto extends ArtistTagLink {}
