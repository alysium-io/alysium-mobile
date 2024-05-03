import { ApiIdentifier } from '@types';
import { ArtistTagLink } from '../artist-tag-link.entity';

export interface DeleteArtistTagLinkBodyDto {
	artist_id: ApiIdentifier;
	tag_id: ApiIdentifier;
}

export interface DeleteArtistTagLinkResponseDto extends ArtistTagLink {}
