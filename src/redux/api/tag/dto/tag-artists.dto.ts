import { ArtistTagLink } from '@flux/api/artist-tag-link';
import { Pagination } from '@flux/api/utils/pagination';
import { ApiIdentifier } from '@types';

export interface FindTagArtistsParamsDto {
	tag_uid: ApiIdentifier;
}

export interface FindTagArtistsQueryDto extends Pagination {}

export interface FindTagArtistsResponseDto extends ArtistTagLink {}
