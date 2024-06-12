import { ApiIdentifier } from '@types';
import { ArtistTagLink } from '../artist-tag-link.entity';

export interface CreateArtistTagLinkBodyDto {
	artist_uid: ApiIdentifier;
	tag_uid: ApiIdentifier;
}

export interface CreateArtistTagLinkResponseDto extends ArtistTagLink {}
