import { ApiIdentifier } from '@types';
import { ArtistTagLink } from '../artist-tag-link.entity';

export interface CreateArtistTagLinkBodyDto {
	artist_id: ApiIdentifier;
	tag_id: ApiIdentifier;
}

export interface CreateArtistTagLinkResponseDto extends ArtistTagLink {}
