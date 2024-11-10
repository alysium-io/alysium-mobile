import { ArtistTagLink } from '@flux/api/artist-tag-link';
import { Pagination } from '@flux/api/utils/pagination';
import { NanoId } from '@types';

export interface FindTagArtistsParamsDto {
	tag_uid: NanoId;
}

export interface FindTagArtistsQueryDto extends Pagination {}

export interface FindTagArtistsResponseDto extends ArtistTagLink {}
