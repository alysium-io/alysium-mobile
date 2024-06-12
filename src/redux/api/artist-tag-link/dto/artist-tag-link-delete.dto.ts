import { ApiIdentifier } from '@types';
import { ArtistTagLink } from '../artist-tag-link.entity';

export interface DeleteArtistTagLinkBodyDto {
	artist_uid: ApiIdentifier;
	tag_uid: ApiIdentifier;
}

export interface DeleteArtistTagLinkResponseDto extends ArtistTagLink {}
